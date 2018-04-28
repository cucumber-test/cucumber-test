/**
 * Change focus to an Iframe (element)
 * @param  {String} selector Element selector
 */
module.exports = (selector) => {
    const {value} = browser.execute(s => document.querySelector(s), selector);

    browser.pause(3000, '*internal*');
    browser.frame(value);
    browser.pause(2000, '*internal*');
};
