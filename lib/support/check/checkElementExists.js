'use strict';

var _checkIfElementExists = require('../lib/checkIfElementExists');

var _checkIfElementExists2 = _interopRequireDefault(_checkIfElementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check if the given element exists
 * @param  {String}   isExisting Whether the element should be existing or not
 *                               (an or no)
 * @param  {String}   elem       Element selector
 */
module.exports = function (isExisting, elem) {
  /**
   * Falsecase assertion
   * @type {Boolean}
   */
  var falseCase = true;

  if (isExisting === 'an') {
    falseCase = false;
  }

  (0, _checkIfElementExists2.default)(elem, falseCase);
};