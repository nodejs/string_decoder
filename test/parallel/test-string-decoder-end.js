'use strict';

var bufferShim = require('buffer-shims');
// verify that the string decoder works getting 1 byte at a time,
// the whole buffer at once, and that both match the .toString(enc)
// result of the entire buffer.

require('../common');
var assert = require('assert');
var SD = require('../../').StringDecoder;
var encodings = ['base64', 'hex', 'utf8', 'utf16le', 'ucs2'];

var bufs = ['☃💩', 'asdf'].map(function (b) {
  return bufferShim.from(b);
});

// also test just arbitrary bytes from 0-15.
for (var i = 1; i <= 16; i++) {
  var bytes = '.'.repeat(i - 1).split('.').map(function (_, j) {
    return j + 0x78;
  });
  bufs.push(bufferShim.from(bytes));
}

encodings.forEach(testEncoding);

console.log('ok');

function testEncoding(encoding) {
  bufs.forEach(function (buf) {
    testBuf(encoding, buf);
  });
}

function testBuf(encoding, buf) {
  console.error('# %s', encoding, buf);

  // write one byte at a time.
  var s = new SD(encoding);
  var res1 = '';
  for (var _i = 0; _i < buf.length; _i++) {
    res1 += s.write(buf.slice(_i, _i + 1));
  }
  res1 += s.end();

  // write the whole buffer at once.
  var res2 = '';
  s = new SD(encoding);
  res2 += s.write(buf);
  res2 += s.end();

  // .toString() on the buffer
  var res3 = buf.toString(encoding);

  console.log('expect=%j', res3);
  console.log('res1=%j', res1);
  console.log('res2=%j', res2);
  assert.strictEqual(res1, res3, 'one byte at a time should match toString');
  assert.strictEqual(res2, res3, 'all bytes at once should match toString');
}