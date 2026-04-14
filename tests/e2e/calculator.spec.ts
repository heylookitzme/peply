import { test, expect } from "@playwright/test";

test.describe("Calculator page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calculator");
  });

  test("renders calculator form", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Calculator");
    await expect(page.locator("#compound")).toBeVisible();
    await expect(page.locator("#vialAmount")).toBeVisible();
    await expect(page.locator("#targetDose")).toBeVisible();
  });

  test("compound combobox opens and filters", async ({ page }) => {
    // Open combobox
    await page.locator("#compound").click();
    await expect(page.locator("[role=listbox]")).toBeVisible();

    // Search for semaglutide
    await page.locator("[role=listbox] input").fill("sema");
    await expect(page.locator("[role=option]").filter({ hasText: "Semaglutide" })).toBeVisible();
  });

  test("selecting a compound auto-populates fields", async ({ page }) => {
    // Open combobox and select Semaglutide
    await page.locator("#compound").click();
    await page.locator("[role=option]").filter({ hasText: "Semaglutide" }).click();

    // Vial amount and diluent should be populated
    const vialAmount = page.locator("#vialAmount");
    await expect(vialAmount).not.toHaveValue("");
    const diluentVolume = page.locator("#diluentVolumeMl");
    await expect(diluentVolume).not.toHaveValue("");
  });

  test("calculates and shows results", async ({ page }) => {
    // Fill in manual values
    await page.locator("#vialAmount").fill("5");
    await page.locator("#diluentVolumeMl").fill("2");
    await page.locator("#targetDose").fill("0.25");

    // Click calculate
    await page.getByRole("button", { name: "Calculate" }).click();

    // Results should appear
    await expect(page.locator("text=mg/mL")).toBeVisible();
    await expect(page.locator("text=mL")).toBeVisible();
  });

  test("shows validation error for empty fields", async ({ page }) => {
    await page.getByRole("button", { name: "Calculate" }).click();
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("links to stack and cost calculators", async ({ page }) => {
    await expect(page.locator("a[href='/calculator/stacks']")).toBeVisible();
    await expect(page.locator("a[href='/calculator/cost']")).toBeVisible();
  });
});
