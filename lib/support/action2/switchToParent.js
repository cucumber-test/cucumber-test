'use strict';

/**
 * Switch from iframe to Parent Window
 */

function browserName() {
    var browserName = global.browser.desiredCapabilities.browserName;

    return browserName.toLowerCase().replace(/ /g, '');
}

module.exports = function () {
    // no wait in here!
    if (browserName() === 'firefox') {
        browser.frame();
    } else {
        browser.frameParent();
    }
    browser.pause(1000, '*internal*');
};