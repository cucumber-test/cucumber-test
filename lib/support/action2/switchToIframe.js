'use strict';

/**
 * Change focus to an Iframe (element)
 * @param  {String} selector Element selector
 */
module.exports = function (selector) {
    var _browser$execute = browser.execute(function (s) {
        return document.querySelector(s);
    }, selector),
        value = _browser$execute.value;

    browser.pause(3000, '*internal*');
    browser.frame(value);
    browser.pause(2000, '*internal*');
};