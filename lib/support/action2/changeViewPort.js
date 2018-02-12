"use strict";

/**
 * Change the viewport of current window
 * @param  {String}   width  The new width of window
 * @param  {String}   height The new height of window
 */
module.exports = function (width, height) {
    browser.setViewportSize({
        width: width,
        height: height
    });
};