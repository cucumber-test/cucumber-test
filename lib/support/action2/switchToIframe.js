"use strict";

/**
 * Change focus to an Iframe (element)
 * @param  {String}   element Element selector
 */
module.exports = function (element) {
    browser.waitForExist("iframe" + element);
    var iFrame = browser.element("iframe" + element).value;
    browser.frame(iFrame);
    // browser.pause(3000);
};