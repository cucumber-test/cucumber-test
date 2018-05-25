'use strict';

var _waitForVisible = require('../action/waitForVisible');

var _waitForVisible2 = _interopRequireDefault(_waitForVisible);

var _clickElement = require('../action/clickElement');

var _clickElement2 = _interopRequireDefault(_clickElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   element Element selector
 */
module.exports = function (action, type, element) {
  (0, _waitForVisible2.default)(element);
  (0, _clickElement2.default)(action, type, element);
};