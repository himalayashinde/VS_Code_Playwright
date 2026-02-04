import { test, expect } from "@playwright/test";

test("Open VS Code and click Explorer", async ({ page }) => {

  // wait for VS Code UI
  const explorer = page.getByLabel("Explorer (Ctrl+Shift+E)");
  await expect(explorer).toBeVisible({ timeout: 60000 });

  // click explorer
  await explorer.click();

});