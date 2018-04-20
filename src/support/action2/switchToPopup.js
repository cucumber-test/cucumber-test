/**
 * Switch to the next popup window
 */
module.exports = () => {
    const handle = browser.windowHandle();
    const windowHandles = browser.windowHandles();
    const next = windowHandles.value.filter(x => handle.value!==x)[0];

    browser.pause(5000, '*internal*');
    if (next) {
        browser.window(next);
        browser.pause(2000, '*internal*');
    }
};
