import { test, expect } from "@playwright/test";

test("VS Code launched", async ({ page }) => {

  // wait longer for slow startup
  await page.waitForTimeout(20000);

  // wait for Explorer icon
  const explorer = page.getByLabel("Explorer (Ctrl+Shift+E)");

  await expect(explorer).toBeVisible({ timeout: 60000 });

});