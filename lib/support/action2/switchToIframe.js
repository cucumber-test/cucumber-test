'use strict';

/**
 * Change focus to an Iframe (element)
 * @param  {String}   element Element selector
 */
module.exports = function (element) {
    // browser.waitForExist(`iframe${element}`);
    var iFrame = browser.element(element).value;

    browser.pause(3000, '*internal*');
    browser.frame(iFrame);
    browser.pause(2000, '*internal*');
};