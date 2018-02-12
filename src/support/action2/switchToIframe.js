/**
 * Change focus to an Iframe (element)
 * @param  {String}   element Element selector
 */
module.exports = (element) => {
    browser.waitForExist(`iframe${element}`);
    const iFrame = browser.element(`iframe${element}`).value;

    browser.pause(3000, '*internal*');
    browser.frame(iFrame);
};
