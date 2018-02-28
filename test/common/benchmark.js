require('babel-polyfill'); /* eslint-disable required-modules */

'use strict';

var assert = require('assert');
var fork = require('child_process').fork;
var path = require('path');

var runjs = path.join(__dirname, '..', '..', 'benchmark', 'run.js');

function runBenchmark(name, args, env) {
  var argv = [];

  for (var i = 0; i < args.length; i++) {
    argv.push('--set');
    argv.push(args[i]);
  }

  argv.push(name);

  var mergedEnv = Object.assign({}, process.env, env);

  var child = fork(runjs, argv, { env: mergedEnv });
  child.on('exit', function (code, signal) {
    assert.strictEqual(code, 0);
    assert.strictEqual(signal, null);
  });
}

module.exports = runBenchmark;