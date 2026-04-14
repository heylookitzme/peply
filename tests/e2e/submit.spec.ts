import { test, expect } from "@playwright/test";

test.describe("Contribute page", () => {
  test("renders submission form", async ({ page }) => {
    await page.goto("/submit");
    await expect(page.locator("h1")).toContainText("Contribute");
    await expect(page.locator("#compound_slug")).toBeVisible();
    await expect(page.locator("#dose_amount")).toBeVisible();
  });

  test("vendor entry point is visible", async ({ page }) => {
    await page.goto("/submit");
    await expect(
      page.locator("text=For Compounding Pharmacies"),
    ).toBeVisible();
    await expect(page.locator("a[href='/vendor/register']")).toBeVisible();
    await expect(page.locator("a[href='/vendor/login']")).toBeVisible();
  });

  test("honeypot field is hidden", async ({ page }) => {
    await page.goto("/submit");
    const honeypot = page.locator("#website");
    // Should exist in DOM but not be visible
    await expect(honeypot).toBeAttached();
    await expect(honeypot).not.toBeVisible();
  });
});
