/**
 * Change focus to an Iframe (element)
 * @param  {String} selector Element selector
 */
module.exports = (selector) => {
    const {value} = browser.execute(s => {
        //IE7 and lower
        if (!document.querySelectorAll) {
            document.querySelectorAll = function (selectors) {
                var element, elements = [], style = document.createElement('style');
                document.documentElement.firstChild.appendChild(style);
                document._qsa = [];

                style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
                window.scrollBy(0, 0);
                style.parentNode.removeChild(style);

                while (document._qsa.length) {
                    element = document._qsa.shift();
                    element.style.removeAttribute('x-qsa');
                    elements.push(element);
                }
                document._qsa = null;
                return elements;
            };
        }
        //IE7 and lower
        if (!document.querySelector) {
            document.querySelector = function (selectors) {
                var elements = document.querySelectorAll(selectors);
                return (elements.length) ? elements[0] : null;
            };
        }
        return document.querySelector(s)
    }, selector);

    browser.pause(3000, '*internal*');
    browser.frame(value);
    browser.pause(2000, '*internal*');
};
