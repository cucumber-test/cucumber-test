'use strict';

/**
 * Perform a key press
 * https://www.w3.org/TR/webdriver/#keyboard-actions
 * @param  {String}   keys   The keys to set the element to
 * @param  {String}   element Element selector
 */
module.exports = function (keys, element) {
    var arr = element.split('|');
    browser.addValue(arr[0], keys.split(','));
    if (arr[1]) {
        browser.pause(+arr[1], '*internal*');
    }
};