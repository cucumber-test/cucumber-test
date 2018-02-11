'use strict';

var _checkIfElementExists = require('../lib/checkIfElementExists');

var _checkIfElementExists2 = _interopRequireDefault(_checkIfElementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set the value of the given input field to a new value or add a value to the
 * current element value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the element to
 * @param  {String}   element Element selector
 */
module.exports = function (method, value, element) {
  /**
   * The command to perform on the browser object (addValue or setValue)
   * @type {String}
   */
  var command = method === 'add' ? 'addValue' : 'setValue';

  var checkValue = value;

  (0, _checkIfElementExists2.default)(element, false, 1);

  if (!value) {
    checkValue = '';
  }

  browser[command](element, checkValue);
};