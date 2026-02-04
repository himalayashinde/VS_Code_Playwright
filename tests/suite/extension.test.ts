import { test, expect } from "@playwright/test";

test("VS Code launched", async ({ page }) => {
  await page.waitForTimeout(5000);
  await expect(page).toHaveTitle(/Visual Studio Code/);
});
