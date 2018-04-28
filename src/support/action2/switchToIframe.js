/**
 * Change focus to an Iframe (element)
 * @param  {String} selector Element selector
 */
module.exports = (selector) => {
    // browser.waitForExist(`iframe${selector}`);
    // const iFrame = browser.element(selector).value;
    const iFrame = browser.execute((s) => document.querySelector(s), selector).value;
    browser.windowId = browser.windowHandle();
    browser.pause(3000, '*internal*');
    browser.frame(iFrame);
    browser.pause(2000, '*internal*');
};
