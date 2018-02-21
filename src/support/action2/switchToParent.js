/**
 * Switch from iframe to Parent Window
 */
module.exports = () => {
    // must not have wait in here!
    browser.frameParent();
    browser.pause(1000, '*internal*');
};
