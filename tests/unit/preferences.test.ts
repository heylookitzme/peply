import { describe, it, expect, vi, beforeEach } from "vitest";

type MockTable = {
  select: ReturnType<typeof vi.fn>;
  insert: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  eq: ReturnType<typeof vi.fn>;
  order: ReturnType<typeof vi.fn>;
  maybeSingle: ReturnType<typeof vi.fn>;
  single: ReturnType<typeof vi.fn>;
};

const table: MockTable = {} as MockTable;

function resetTable(): void {
  table.select = vi.fn(() => table);
  table.insert = vi.fn(() => table);
  table.update = vi.fn(() => table);
  table.delete = vi.fn(() => table);
  table.eq = vi.fn(() => table);
  table.order = vi.fn(() => Promise.resolve({ data: [], error: null }));
  table.maybeSingle = vi.fn(() => Promise.resolve({ data: null, error: null }));
  table.single = vi.fn(() =>
    Promise.resolve({
      data: { id: "u1", favorite_compounds: [], favorite_stacks: [] },
      error: null,
    }),
  );
}

const from = vi.fn(() => table);

vi.mock("@/utils/supabase/client", () => ({
  createClient: () => ({ from }),
}));

beforeEach(() => {
  resetTable();
  from.mockClear();
});

describe("preferences queries", () => {
  it("toggleFavorite adds a slug when not present", async () => {
    const { toggleFavorite } = await import("@/lib/preferences/queries");
    table.maybeSingle = vi.fn(() =>
      Promise.resolve({
        data: {
          id: "u1",
          favorite_compounds: [],
          favorite_stacks: [],
          display_name: null,
          created_at: "",
          updated_at: "",
        },
        error: null,
      }),
    );
    table.eq = vi.fn(() => ({
      // terminal for update
      ...table,
      then: (resolve: (v: { data: null; error: null }) => void) =>
        resolve({ data: null, error: null }),
    }));
    const next = await toggleFavorite("u1", "compound", "semaglutide");
    expect(next).toEqual(["semaglutide"]);
    expect(table.update).toHaveBeenCalledWith({
      favorite_compounds: ["semaglutide"],
    });
  });

  it("toggleFavorite removes a slug when already present", async () => {
    const { toggleFavorite } = await import("@/lib/preferences/queries");
    table.maybeSingle = vi.fn(() =>
      Promise.resolve({
        data: {
          id: "u1",
          favorite_compounds: ["bpc-157"],
          favorite_stacks: [],
          display_name: null,
          created_at: "",
          updated_at: "",
        },
        error: null,
      }),
    );
    const next = await toggleFavorite("u1", "compound", "bpc-157");
    expect(next).toEqual([]);
    expect(table.update).toHaveBeenCalledWith({ favorite_compounds: [] });
  });

  it("toggleFavorite operates on stacks independently", async () => {
    const { toggleFavorite } = await import("@/lib/preferences/queries");
    table.maybeSingle = vi.fn(() =>
      Promise.resolve({
        data: {
          id: "u1",
          favorite_compounds: ["semaglutide"],
          favorite_stacks: [],
          display_name: null,
          created_at: "",
          updated_at: "",
        },
        error: null,
      }),
    );
    const next = await toggleFavorite("u1", "stack", "wolverine");
    expect(next).toEqual(["wolverine"]);
    expect(table.update).toHaveBeenCalledWith({ favorite_stacks: ["wolverine"] });
  });

  it("createPreset inserts and returns the row", async () => {
    const { createPreset } = await import("@/lib/preferences/queries");
    const preset = {
      id: "p1",
      user_id: "u1",
      name: "Test",
      compound_slug: null,
      vial_strength: 5,
      vial_unit: "mg" as const,
      diluent_volume: 2,
      target_dose: 0.25,
      dose_unit: "mg" as const,
      syringe_type: "u100_1ml",
      created_at: "",
    };
    table.single = vi.fn(() => Promise.resolve({ data: preset, error: null }));
    const result = await createPreset("u1", {
      name: "Test",
      compound_slug: null,
      vial_strength: 5,
      vial_unit: "mg",
      diluent_volume: 2,
      target_dose: 0.25,
      dose_unit: "mg",
      syringe_type: "u100_1ml",
    });
    expect(result.id).toBe("p1");
    expect(table.insert).toHaveBeenCalled();
  });

  it("deletePreset throws when supabase reports an error", async () => {
    const { deletePreset } = await import("@/lib/preferences/queries");
    table.eq = vi.fn(() =>
      Promise.resolve({ error: { message: "forbidden" } }),
    );
    await expect(deletePreset("p1")).rejects.toMatchObject({
      message: "forbidden",
    });
  });

  it("deletePreset resolves on success", async () => {
    const { deletePreset } = await import("@/lib/preferences/queries");
    table.eq = vi.fn(() => Promise.resolve({ error: null }));
    await expect(deletePreset("p1")).resolves.toBeUndefined();
  });

  it("listPresets orders by created_at desc", async () => {
    const { listPresets } = await import("@/lib/preferences/queries");
    table.order = vi.fn(() => Promise.resolve({ data: [], error: null }));
    await listPresets("u1");
    expect(table.order).toHaveBeenCalledWith("created_at", {
      ascending: false,
    });
  });
});
