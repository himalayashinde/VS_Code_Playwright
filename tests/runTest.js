const path = require("path");
const { runTests } = require("@vscode/test-electron");

async function run() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, "../extension");
    const extensionTestsPath = path.resolve(__dirname, "./suite");

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath
    });
  } catch (err) {
    console.error("Failed to run tests");
    process.exit(1);
  }
}

module.exports = {
  run
};