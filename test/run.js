'use strict';

// Runs every test file in test/parallel/ in its own child process, so each
// file is isolated the same way the previous `tap` runner did it.

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var dir = path.join(__dirname, 'parallel');
var files = fs.readdirSync(dir).filter(function (f) {
  return /\.js$/.test(f);
}).sort();

var failed = false;

function runNext(i) {
  if (i >= files.length) {
    process.exit(failed ? 1 : 0);
    return;
  }

  var file = path.join(dir, files[i]);
  var child = spawn(process.execPath, [file], { stdio: 'inherit' });

  child.on('exit', function (code) {
    if (code !== 0) {
      console.error('\nFAILED: ' + file + '\n');
      failed = true;
    }
    runNext(i + 1);
  });
}

runNext(0);
