'use strict';

var _checkIfElementExists = require('../lib/checkIfElementExists');

var _checkIfElementExists2 = _interopRequireDefault(_checkIfElementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Type the value of the given input field
 * @param  {String}   value   The value to type the element to
 * @param  {String}   element Element selector
 */
module.exports = function (value, element) {
    browser.pause(browser.options.general.inputPause || 500, '*internal*');
    browser.clearElement(element);
    var result = browser.elementActive();
    var activeElement = Object.values(result.value)[0];
    browser.elementIdValue(activeElement, value.split(''));
    // value.split('').map(chr => browser.elementIdValue(activeElement, chr))
};