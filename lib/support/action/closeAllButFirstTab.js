"use strict";

/**
 * Close all but the first tab
 * @param  {String}   obsolete Type of object to close (window or tab)
 */
/* eslint-disable no-unused-vars */
module.exports = function (obsolete) {
    /* eslint-enable no-unused-vars */
    /**
     * Get all the window handles
     * @type {Object}
     */
    var windowHandles = browser.windowHandles().value;

    // Close all tabs but the first one
    windowHandles.forEach(function (handle, index) {
        if (index > 0) {
            browser.switchTab(handle).close();
        }
    });
};