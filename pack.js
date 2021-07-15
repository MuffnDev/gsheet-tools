const Path = require('path');
const NodeHelpers = require('@muffin-dev/node-helpers');

const INPUT_DIR = Path.join(__dirname, './lib/gsheet');
const OUTPUT_DIR = Path.join(__dirname, './gsheet');

const REMOVE_LINES_IF_INCLUDES = [
  '"use strict"',
  'Object.defineProperty(exports',
  'exports.'
];

(async () => {

  // Get scripts from ./gsheet directory
  let files = await NodeHelpers.readdirAsync(INPUT_DIR, false, true, 'js', true, true);

  for (const file of files) {
    const js = await NodeHelpers.readFileAsync(file.path);
    const split = js.split(/\r?\n/);
    for (let i = 0; i < split.length; i++) {
      for (const rm of REMOVE_LINES_IF_INCLUDES) {
        if (split[i].includes(rm)) {
          split[i] = '';
          break;
        }
      }
    }

    await NodeHelpers.writeFileAsync(Path.join(OUTPUT_DIR, file.fullName), split.join('\n').trim())
  }

  // Copy other files (*.json and *.html) as is into the output /gsheet directory
  files = await NodeHelpers.readdirAsync(INPUT_DIR, false, true, [ 'json', 'html' ], true, true);
  for (const file of files) {
    await NodeHelpers.copyFileAsync(file.path, Path.join(OUTPUT_DIR, file.fullName));
  }

})();
