import { test, expect } from "@playwright/test";

test.describe("Cost calculator", () => {
  test("renders with stack and single tabs", async ({ page }) => {
    await page.goto("/calculator/cost");
    await expect(page.locator("h1")).toContainText("Cost");
    await expect(page.getByRole("button", { name: "Full Stack" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Single Compound" })).toBeVisible();
  });

  test("selecting a stack shows compound inputs", async ({ page }) => {
    await page.goto("/calculator/cost");
    await page.locator("#stack-cost-select").selectOption("wolverine");

    // Should show BPC-157 and TB-500 inputs
    await expect(page.locator("text=BPC-157")).toBeVisible();
    await expect(page.locator("text=TB-500")).toBeVisible();
    // Price inputs should be present
    await expect(page.locator("input[placeholder='e.g. 45.00']").first()).toBeVisible();
  });

  test("deep link pre-selects stack", async ({ page }) => {
    await page.goto("/calculator/cost?stack=wolverine");
    await expect(page.locator("text=BPC-157")).toBeVisible();
  });
});
