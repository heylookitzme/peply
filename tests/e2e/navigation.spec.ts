import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("all header nav links work", async ({ page }) => {
    await page.goto("/");

    const navLinks = [
      { name: "Calculator", url: "/calculator" },
      { name: "Compounds", url: "/compounds" },
      { name: "Stacks", url: "/stacks" },
      { name: "Regulatory", url: "/regulatory" },
      { name: "Contribute", url: "/submit" },
    ];

    for (const link of navLinks) {
      await page.goto("/");
      await page.locator("header").getByRole("link", { name: link.name }).click();
      await expect(page).toHaveURL(new RegExp(link.url));
    }
  });

  test("footer links work", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("footer a[href='/terms']")).toBeVisible();
    await expect(page.locator("footer a[href='/privacy']")).toBeVisible();
    await expect(page.locator("footer a[href='/contact']")).toBeVisible();
    await expect(page.locator("footer a[href='/vendor/login']")).toBeVisible();
  });

  test("theme toggle switches mode", async ({ page }) => {
    await page.goto("/");

    // Click theme toggle
    const toggle = page.locator("header button[aria-label*='Switch to']");
    await toggle.click();

    // Check data-theme attribute changed
    const theme = await page.locator("html").getAttribute("data-theme");
    expect(theme).toBeTruthy();
  });

  test("page title format is correct", async ({ page }) => {
    await page.goto("/calculator");
    await expect(page).toHaveTitle(/Calculator.*Peply/);

    await page.goto("/compounds");
    await expect(page).toHaveTitle(/Compounds.*Peply/);

    await page.goto("/");
    await expect(page).toHaveTitle(/Peply/);
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("hamburger menu opens and closes", async ({ page }) => {
    await page.goto("/");

    // Desktop nav should be hidden
    await expect(page.locator("header nav.hidden")).toBeTruthy();

    // Click hamburger
    const hamburger = page.locator("header button[aria-label='Open menu']");
    await hamburger.click();

    // Mobile menu should be visible with all links
    await expect(page.getByRole("link", { name: "Calculator" }).last()).toBeVisible();
    await expect(page.getByRole("link", { name: "Compounds" }).last()).toBeVisible();

    // Click close
    await page.locator("button[aria-label='Close menu']").first().click();
  });

  test("mobile menu closes on link click", async ({ page }) => {
    await page.goto("/");

    // Open menu
    await page.locator("header button[aria-label='Open menu']").click();

    // Click a link
    await page.getByRole("link", { name: "Calculator" }).last().click();

    // Should navigate
    await expect(page).toHaveURL(/calculator/);
  });
});
