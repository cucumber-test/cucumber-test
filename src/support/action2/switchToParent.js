/**
 * Switch from iframe to Parent Window
 */
module.exports = () => {
    // must not have wait in here!
    var windowId = browser.windowHandle();
    if (windowId !== browser.windowId) {
        browser.frameParent();
        browser.pause(1000, '*internal*');
    }
};
