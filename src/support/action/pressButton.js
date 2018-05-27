/**
 * Perform a key press
 * https://www.w3.org/TR/webdriver/#keyboard-actions
 * @param  {String}   keys   The keys to set the element to
 * @param  {String}   element Element selector
 */
module.exports = (keys, element) => {
    browser.addValue(element.split('|')[0], keys.split(','));
    // browser.keys(key);
};
