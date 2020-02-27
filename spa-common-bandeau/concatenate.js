const fs = require('fs-extra');
const concat = require('concat');
concatenate = async () =>{
  const files = [
    './dist/spa-common-bandeau/runtime-es5.js',
    // './dist/spa-common-bandeau/polyfills-es5.js',
    './dist/spa-common-bandeau/scripts.js',
    './dist/spa-common-bandeau/main-es5.js'
  ];

  await fs.ensureDir('output');
  await concat(files, './dist/spa-common-bandeau/index.js');
}
concatenate();
