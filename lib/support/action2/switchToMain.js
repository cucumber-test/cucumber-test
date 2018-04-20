'use strict';

/**
 * Switch to the main window
 */
module.exports = function () {
    browser.pause(5000, '*internal*');

    var windowHandles = browser.windowHandles();
    var next = windowHandles.value[0];
    if (next) {
        browser.window(next);
        browser.pause(2000, '*internal*');
    }
};