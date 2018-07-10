'use strict';

/**
 * Set the value of the given input field to a new value or add a value to the
 * current element value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the element to
 * @param  {String}   element Element selector
 */
module.exports = (method, value, element) => {
  /**
   * The command to perform on the browser object (addValue or setValue)
   * @type {String}
   */
  let checkValue = value || '';
  const arr = element.split('|');
  const { base } = global.browser.options;
  const command = method === 'add' ? 'addValue' : 'setValue';
  browser.pause(base.inputPause || 500, '*internal*');
  browser[command](arr[0], checkValue);
  if (arr[1]) {
    browser.pause(+arr[1], '*internal*');
  }
};