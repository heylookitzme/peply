import { test, expect } from "@playwright/test";

test.describe("Stacks pages", () => {
  test("stacks list shows all stacks", async ({ page }) => {
    await page.goto("/stacks");
    await expect(page.locator("h1")).toContainText("Protocols");
    await expect(page.locator("text=Wolverine")).toBeVisible();
    await expect(page.locator("text=Metabolic")).toBeVisible();
  });

  test("Wolverine stack detail page loads", async ({ page }) => {
    await page.goto("/stacks/wolverine");
    await expect(page.locator("h1")).toContainText("Wolverine");
    // Should show both compounds
    await expect(page.locator("text=BPC-157")).toBeVisible();
    await expect(page.locator("text=TB-500")).toBeVisible();
  });

  test("stack calculator section expands", async ({ page }) => {
    await page.goto("/stacks/wolverine");

    // Click "Calculate reconstitution"
    await page.locator("text=Calculate reconstitution").click();

    // Should show per-compound inputs
    await expect(page.locator("text=BAC water")).toBeVisible();
    await expect(page.locator("text=Target dose")).toBeVisible();
    await expect(page.getByRole("button", { name: "Calculate Stack" })).toBeVisible();
  });
});
