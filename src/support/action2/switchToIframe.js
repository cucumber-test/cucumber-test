/**
 * Change focus to an Iframe (element)
 * @param  {String} selector Element selector
 */
module.exports = (selector) => {
    let p1 = 3000, p2 = 2000;
    const arr = element.split('|');
    const idx = browser.element(arr[0]).value;
    if (arr[1] === '0') {
        browser.frame(idx);
    } else {
        if (arr[1] && +arr[1] >= 500) {
            const value = +arr[1];
            p1 = value * 3/5;
            p2 = value * 2/5;
        }
        browser.pause(p1, '*internal*');
        browser.frame(idx);
        browser.pause(p2, '*internal*');
    }
};
