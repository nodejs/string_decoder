var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill'); /* eslint-disable required-modules */
'use strict';

var assert = require('assert');
var kLimit = Symbol('limit');
var kCallback = Symbol('callback');

var Countdown = function () {
  function Countdown(limit, cb) {
    _classCallCheck(this, Countdown);

    assert.strictEqual(typeof limit, 'number');
    assert.strictEqual(typeof cb, 'function');
    this[kLimit] = limit;
    this[kCallback] = cb;
  }

  Countdown.prototype.dec = function dec() {
    assert(this[kLimit] > 0, 'Countdown expired');
    if (--this[kLimit] === 0) this[kCallback]();
    return this[kLimit];
  };

  _createClass(Countdown, [{
    key: 'remaining',
    get: function () {
      return this[kLimit];
    }
  }]);

  return Countdown;
}();

module.exports = Countdown;