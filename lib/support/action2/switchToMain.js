'use strict';

/**
 * Switch to the main window
 */
module.exports = function () {
    var windowHandles = browser.windowHandles();
    var next = windowHandles.value[0];

    browser.pause(5000, '*internal*');
    next && browser.window(next);
};