/**
 * Type the value of the given input field
 * @param  {String}   value   The value to type the element to
 * @param  {String}   selector Element selector
 */
module.exports = (value, selector) => {
    browser.pause(browser.options.base.inputPause || 500, '*internal*');
    const elementId = browser.element(selector).value.ELEMENT;
    browser.elementIdClear(elementId);
    browser.elementIdValue(elementId, value);
};
