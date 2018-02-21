'use strict';

/**
 * Switch from iframe to Parent Window
 */
module.exports = function () {
    // must not have wait in here!
    browser.frameParent();
    browser.pause(1000, '*internal*');
};