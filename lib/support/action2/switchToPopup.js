'use strict';

/**
 * Switch to the next popup window
 */
module.exports = function () {
    browser.pause(5000, '*internal*');
    var handle = browser.windowHandle();
    var windowHandles = browser.windowHandles();
    var next = windowHandles.value.filter(function (x) {
        return handle.value !== x;
    })[0];
    next && browser.window(next);
};