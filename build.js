/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require('path');
const NodeHelpers = require('@muffin-dev/node-helpers');

////////////////////////////////////////
// Settings
////////////////////////////////////////

// Defines the directory that contains all your app source files.
const SRC_DIR = Path.join(__dirname, './src');

// Defines the directory where the app is built.
const OUT_DIR = Path.join(__dirname, './');

(async () => {

  ////////////////////////////////////////
  // Remove existing package directories
  ////////////////////////////////////////

  await NodeHelpers.removeDirectory('./doc', true);
  await NodeHelpers.removeDirectory('./lib', true);
  await NodeHelpers.removeDirectory('./test', true);

  ////////////////////////////////////////
  // Copy all static files
  ////////////////////////////////////////

  // Get all files (except for *.ts files)
  const files = await NodeHelpers.readdirAsync(SRC_DIR, false, true, 'ts', true, true, true);
  // Copy all these files to the output directory
  const copyProcesses = [];
  files.forEach(file => {
    const relPath = file.path.slice(SRC_DIR.length);
    copyProcesses.push(NodeHelpers.copyFileAsync(file.path, Path.join(OUT_DIR, relPath)));
  });
  await Promise.all(copyProcesses);

  // If the /src/doc directory is missing or is empty, copy the main README.md file into /doc
  const docFiles = await NodeHelpers.readdirAsync(Path.join(SRC_DIR, 'doc'), false, true, null, true, true);
  if (docFiles.length === 0) {
    await NodeHelpers.copyFileAsync('./README.md', Path.join(OUT_DIR, 'doc/README.md'));
  }

})();
