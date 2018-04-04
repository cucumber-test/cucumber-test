import checkIfElementExists from '../lib/checkIfElementExists';

/**
 * Type the value of the given input field
 * @param  {String}   value   The value to type the element to
 * @param  {String}   element Element selector
 */
module.exports = (value, element) => {
    browser.setValueSafe(element, value);
};
