'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUtf8 = exports.add0x = exports.isAddr = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utf = require('utf8');

var _utf2 = _interopRequireDefault(_utf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Test if addr is ethereum address
 * @param  {string}  addr eth address
 * @return {Boolean}
 */
var isAddr = exports.isAddr = function isAddr(addr) {
  return (/^(0x)?[0-9a-f]{40}$/i.test(addr) || /^(0x)?[0-9a-f]{64}$/i.test(addr)
  );
};

/**
 * Return formated address ethereum
 * @param {string} input address ethereum
 * @return {string}      formated address ethereum or false
 */
var add0x = exports.add0x = function add0x(input) {
  if (!input || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== _typeof('') || !isAddr(input)) return false;
  return input.slice(0, 2) !== '0x' ? '0x' + input : input;
};

/**
 * @ignore
 * Return formated hexa string
 * @param  {string} hex encoded string
 * @return {string}     decoded string
 */
var toUtf8 = exports.toUtf8 = function toUtf8(hex) {
  var str = '';

  for (var i = hex.substring(0, 2) === '0x' ? 2 : 0; i < hex.length; i += 2) {
    var code = parseInt(hex.substr(i, 2), 16);
    if (code === 0) break;
    str += String.fromCharCode(code);
  }
  try {
    return _utf2.default.decode(str);
  } catch (e) {
    return '';
  }
};