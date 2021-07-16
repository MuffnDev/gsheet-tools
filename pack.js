const Path = require('path');
const NodeHelpers = require('@muffin-dev/node-helpers');

const INPUT_DIR = Path.join(__dirname, './lib/gsheet');
const OUTPUT_DIR = Path.join(__dirname, './gsheet');

// Defines which lines should be removed from the final script export
const DISCARD_LINES = {
  '"use strict"': 'remove',
  'Object.defineProperty(exports': 'remove',
  'exports.': 'clean',
  '@ts-ignore': 'remove',
  'require(\'./seedrandom': 'remove'
}

const DISCLAIMERS = {
  js: `/**
 * WARNING: This file is generated from the GSheet Tools project: https://gitlab.com/muffin-dev/nodejs/gsheet-tools
 * Any changes made directy from the Google Apps Script editor will be erased on the next release.
 */`,
  html: `<!-- WARNING: This file is generated from the GSheet Tools project: https://gitlab.com/muffin-dev/nodejs/gsheet-tools
 Any changes made directy from the Google Apps Script editor will be erased on the next release. -->`
};

const IMPORT_REGEX = /const (.+) = require/;

(async () => {

  // Get scripts from ./gsheet directory
  let files = await NodeHelpers.readdirAsync(INPUT_DIR, false, true, 'js', true, true);

  // For each file
  for (const file of files) {
    // Get the file content as a string
    const js = await NodeHelpers.readFileAsync(file.path);
    // Split file lines
    const lines = js.split(/\r?\n/);

    const imports = [];

    // For each line
    for (let i = 0; i < lines.length; i++) {
      let cancel = false;

      for (const discardString of Object.keys(DISCARD_LINES)) {
        if (lines[i].includes(discardString)) {
          // If line should be cleaned, empty it
          if (DISCARD_LINES[discardString] === 'clean') {
            lines[i] = '';
          }
          // Else, remove it
          else {
            lines.splice(i, 1);
            i--;
          }

          cancel = true;
          break;
        }
      }

      // Skip if the line has been removed or cleaned
      if (cancel) {
        continue;
      }

      // Checks if the line declares an import (which is not available in Google Apps Script, all functions are in global space)
      const match = lines[i].match(IMPORT_REGEX);
      if (match) {
        imports.push(match[1]);
        console.log('Add import', match[1]);
        lines.splice(i, 1);
        i--;
        continue;
      }

      // If the current line contains an import, remove it
      for (const imp of imports) {
        while (lines[i].includes(imp + '.')) {
          lines[i] = lines[i].replace(imp + '.', '');
        }
      }
    }

    // Adds the disclaimer for Google Apps Script export
    lines.unshift(DISCLAIMERS.js, '');
    // Write the final file
    await NodeHelpers.writeFileAsync(Path.join(OUTPUT_DIR, file.fullName), lines.join('\n').trim())
  }

  // Copy other files (*.json and *.html) as is into the output /gsheet directory
  files = await NodeHelpers.readdirAsync(INPUT_DIR, false, true, [ 'json', 'html' ], true, true);
  for (const file of files) {
    if (file.extension === 'html') {
      const html = await NodeHelpers.readFileAsync(file.path);
      html = DISCLAIMERS.html + '\n\n';
      await NodeHelpers.writeFileAsync(Path.join(OUTPUT_DIR, file.fullName), html)
    }
    else {
      await NodeHelpers.copyFileAsync(file.path, Path.join(OUTPUT_DIR, file.fullName));
    }
  }

})();
