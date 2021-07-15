const Path = require('path');
const NodeHelpers = require('@muffin-dev/node-helpers');

const INPUT_DIR = Path.join(__dirname, './lib/gsheet');
const OUTPUT_DIR = Path.join(__dirname, './gsheet');

const REMOVE_LINES_IF_INCLUDES = [
  '"use strict"',
  'Object.defineProperty(exports',
  'exports.'
];

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
      // If the line contains one of the "remove conditions", clean it from the output
      for (const rm of REMOVE_LINES_IF_INCLUDES) {
        if (lines[i].includes(rm)) {
          lines[i] = '';
          break;
        }
      }

      // Checks if the line declares an import (which is not available in Google Apps Script, all functions are in global space)
      const match = lines[i].match(IMPORT_REGEX);
      if (match) {
        imports.push(match[1]);
        lines[i] = '';
        continue;
      }

      // If the current line contains an import, remove it
      for (const imp of imports) {
        while (lines[i].includes(imp + '.')) {
          lines[i] = lines[i].replace(imp + '.', '');
        }
      }
    }

    // Remove all lines before the first comment
    // for (let i = 0; i < lines.length; i++) {
    //   if (!lines[i].startsWith('/**')) {
    //     lines.splice(i, 1);
    //     i--;
    //   }
    //   else {
    //     break;
    //   }
    // }

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
