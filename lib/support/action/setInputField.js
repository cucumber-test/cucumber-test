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

    var browserName = browser.desiredCapabilities.browserName;


    var checkValue = value;
    if (!value) {
        checkValue = '';
    }

    var base = global.browser.options.base;

    browser.pause(base.inputPause || 500, '*internal*');
    // const windowHandles = browser.windowHandles();
    // if (browserName==='safari' && windowHandles.value.length>1) {
    //     // http://www.paraesthesia.com/archive/2010/01/29/the-difference-between-a-workaround-and-a-fix.aspx/
    //     browser.execute(function(element, checkValue) {
    //          document.querySelector(element).value = checkValue;
    //     }, element, checkValue)
    // } else {
    var command = method === 'add' ? 'addValue' : 'setValue';
    (0, _checkIfElementExists2.default)(element, false, 1);
    browser[command](element, checkValue);
    // }
};