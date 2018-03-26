"use strict";

/**
 * Dismiss any alert that show
 */
module.exports = function () {
    if (browser.alertText()) {
        browser.alertDismiss();
    }
};