/**
 * Change the viewport of current window
 * @param  {String}   width  The new width of window
 * @param  {String}   height The new height of window
 */
module.exports = (width, height) => {
    browser.setViewportSize({
        width,
        height,
    });
};
