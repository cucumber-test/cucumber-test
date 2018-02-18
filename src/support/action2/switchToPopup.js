/**
 * Switch to the next popup window
 */
module.exports = () => {
    const handle = browser.windowHandle();
    const windowHandles = browser.windowHandles();
    const next = windowHandles.value.filter(x => handle.value!==x)[0];

    browser.pause(5000, '*internal*');
    next && browser.window(next);
};
