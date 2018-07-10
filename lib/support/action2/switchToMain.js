'use strict';

/**
 * Switch to the main window
 */
module.exports = () => {
    browser.pause(5000, '*internal*');

    const windowHandles = browser.windowHandles();
    const next = windowHandles.value[0];
    if (next) {
        browser.window(next);
        browser.pause(2000, '*internal*');
    }
};