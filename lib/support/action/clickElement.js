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
module.exports = (action, type, element) => {
  /**
   * Element to perform the action on
   * @type {String}
   */
  const arr = element.split('|');
  const elem = type === 'link' ? `=${arr[0]}` : arr[0];

  /**
   * The method to call on the browser object
   * @type {String}
   */
  const method = action === 'click' ? 'click' : 'doubleClick';

  (0, _checkIfElementExists2.default)(elem);

  browser.pause(1000, '*internal*');
  browser[method](elem);
  if (arr[1]) {
    browser.pause(+arr[1], '*internal*');
  }
};