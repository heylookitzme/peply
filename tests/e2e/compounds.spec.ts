import { test, expect } from "@playwright/test";

test.describe("Compounds page", () => {
  test("renders all compounds", async ({ page }) => {
    await page.goto("/compounds");
    await expect(page.locator("h1")).toContainText("Reference");

    // Should show count
    await expect(page.locator("text=21 compounds")).toBeVisible();
  });

  test("search filters compounds", async ({ page }) => {
    await page.goto("/compounds");

    await page.locator("input[placeholder*='Search']").fill("BPC");

    // BPC-157 should be visible
    await expect(page.locator("text=BPC-157")).toBeVisible();
    // Semaglutide should NOT be visible
    await expect(page.locator("a").filter({ hasText: "Semaglutide" })).not.toBeVisible();
  });

  test("category filter pills work", async ({ page }) => {
    await page.goto("/compounds");

    // Click GLP-1 filter
    await page.getByRole("button", { name: "GLP-1" }).click();

    // Should show fewer compounds
    await expect(page.locator("text=Semaglutide")).toBeVisible();
    // BPC-157 should not be visible under GLP-1
    await expect(page.locator("a").filter({ hasText: "BPC-157" })).not.toBeVisible();
  });

  test("compound card links to detail page", async ({ page }) => {
    await page.goto("/compounds");
    await page.locator("a").filter({ hasText: "Semaglutide" }).first().click();
    await expect(page).toHaveURL(/\/compounds\/semaglutide/);
    await expect(page.locator("h1")).toContainText("Semaglutide");
  });

  test("compound detail page shows regulatory badge", async ({ page }) => {
    await page.goto("/compounds/semaglutide");
    await expect(page.locator("text=FDA Approved")).toBeVisible();
  });
});
