/**
 * Change focus to an Iframe (element)
 * @param  {String}   element Element selector
 */
module.exports = (element) => {
    browser.waitForExist(`iframe${element}`);
    const iFrame = browser.element(`iframe${element}`).value;
    browser.frame(iFrame);
    // browser.pause(3000);
};
