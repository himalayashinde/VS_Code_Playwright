import { downloadAndUnzipVSCode } from '@vscode/test-electron';
import * as cp from 'child_process';
import * as path from 'path';

async function main() {

  const vscodePath = await downloadAndUnzipVSCode('stable');

  // Windows executable path
  const codeExe = vscodePath;

  const userDataDir = path.resolve(__dirname, '../test-user-data');
  const extensionsDir = path.resolve(__dirname, '../test-extensions');

  console.log("Launching regular VS Code...");
  console.log("Executable:", codeExe);

  cp.spawn(
    `"${codeExe}"`,
    [
      '--user-data-dir', userDataDir,
      '--extensions-dir', extensionsDir
    ],
    {
      detached: true,
      shell: true,      // 👈 important on Windows
      stdio: 'ignore'
    }
  ).unref();
}

main();