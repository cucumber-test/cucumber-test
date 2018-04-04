'use strict';

/**
 * Type the value of the given input field
 * @param  {String}   value   The value to type the element to
 * @param  {String}   selector Element selector
 */
module.exports = function (value, selector) {
  browser.pause(browser.options.base.inputPause || 500, '*internal*');
  var elementId = browser.element(selector).value.ELEMENT;
  browser.elementIdClear(elementId);
  browser.elementIdValue(elementId, value);
};