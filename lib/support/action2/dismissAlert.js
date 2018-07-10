"use strict";

/**
 * Dismiss any alert that show
 */
module.exports = () => {
    if (browser.alertText()) {
        browser.alertDismiss();
    }
};