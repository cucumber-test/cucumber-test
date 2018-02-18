/**
 * Switch to the main window
 */
module.exports = () => {
    const windowHandles = browser.windowHandles();
    const next = windowHandles.value[0];

    browser.pause(5000, '*internal*');
    next && browser.window(next);
};
