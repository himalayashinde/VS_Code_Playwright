import { test, expect } from "@playwright/test";

test("Open Command Palette", async ({ page }) => {

  // Wait for VS Code window
  await page.waitForTimeout(5000);

  // Open command palette
  await page.keyboard.press("Control+Shift+P");

  // Type command
  await page.keyboard.type("View: Toggle Terminal");

  await page.keyboard.press("Enter");

  // Simple validation (terminal appears)
  const terminal = page.locator(".terminal-wrapper");

  await expect(terminal).toBeVisible();
});