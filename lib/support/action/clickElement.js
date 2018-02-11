'use strict';

var _checkIfElementExists = require('../lib/checkIfElementExists');

var _checkIfElementExists2 = _interopRequireDefault(_checkIfElementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   element Element selector
 */
module.exports = function (action, type, element) {
  /**
   * Element to perform the action on
   * @type {String}
   */
  var elem = type === 'link' ? '=' + element : element;

  /**
   * The method to call on the browser object
   * @type {String}
   */
  var method = action === 'click' ? 'click' : 'doubleClick';

  (0, _checkIfElementExists2.default)(elem);

  browser[method](elem);
};