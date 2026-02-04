import * as path from "path";
import { runTests } from "@vscode/test-electron";

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../extension");
    const extensionTestsPath = path.resolve(__dirname, "../tests/runTest.js");

    const userDataDir = path.resolve(__dirname, "../test-user-data");
    const extensionsDir = path.resolve(__dirname, "../test-extensions");

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [
        "--disable-extensions=false",
        `--user-data-dir=${userDataDir}`,
        `--extensions-dir=${extensionsDir}`
      ]
    });

    console.log("VS Code launched. Close manually when finished.");
    await new Promise(() => {});
  } catch (err) {
    console.error("Failed to run tests", err);
    process.exit(1);
  }
}

main();