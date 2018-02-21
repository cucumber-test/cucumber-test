/**
 * Switch to the main window
 */
module.exports = () => {
    browser.pause(5000, '*internal*');

    const windowHandles = browser.windowHandles();
    const next = windowHandles.value[0];
    next && browser.window(next);
};
