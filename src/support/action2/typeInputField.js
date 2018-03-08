import checkIfElementExists from '../lib/checkIfElementExists';

/**
 * Type the value of the given input field
 * @param  {String}   value   The value to type the element to
 * @param  {String}   element Element selector
 */
module.exports = (value, element) => {
    browser.pause(browser.options.general.inputPause || 500, '*internal*');
    browser.clearElement(element);
    const result = browser.elementActive();
    const node = Object.values(result.value)[0];
    browser.elementIdValue(node, value);
};
