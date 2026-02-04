import { test, expect, _electron as electron } from "@playwright/test";
import fs from "fs";
import { highlightLocator } from "./utils/highlight";

test("Launch VS Code (Electron) and verify Explorer", async () => {
  test.setTimeout(120000);

  const workspacePath = "I:\\Coding_journey\\SampleFile";

  if (!fs.existsSync(workspacePath)) {
    throw new Error(`Workspace path does not exist: ${workspacePath}`);
  }

  const userDataDir =
    "I:\\Coding_journey\\VS_Code_Playwright\\.tmp\\user-data";
  const extensionsDir =
    "I:\\Coding_journey\\VS_Code_Playwright\\.tmp\\extensions";

  const electronApp = await electron.launch({
    executablePath:
      "I:\\Coding_journey\\VS_Code_Playwright\\.vscode-test\\vscode-win32-x64-archive-1.108.2\\Code.exe",

    args: [
      workspacePath,     // ✅ THIS IS THE KEY
      `--user-data-dir=${userDataDir}`,
      `--extensions-dir=${extensionsDir}`,
      "--no-sandbox",
      "--disable-gpu"
    ]
  });

  // Wait for first VS Code window
  const window = await electronApp.waitForEvent("window", { timeout: 60000 });

  await window.waitForLoadState("domcontentloaded");

  const screenSize = await window.evaluate(() => ({
    width: window.screen.availWidth,
    height: window.screen.availHeight
  }));
  await window.setViewportSize({
    width: screenSize.width,
    height: screenSize.height
  });

  await window
    .locator(".activitybar")
    .waitFor({ state: "visible", timeout: 60000 });

  const extensionsButton = window.locator(
    'a.action-label[aria-label="Extensions (Ctrl+Shift+X)"]'
  );

  await expect(extensionsButton).toBeVisible({ timeout: 60000 });
  await highlightLocator(extensionsButton);

  try {
    await extensionsButton.click();
  } catch {
    // Fallback: open Extensions via shortcut if the button is obstructed.
    await window.keyboard.press("Control+Shift+X");
  }
});
