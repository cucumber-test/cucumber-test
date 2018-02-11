"use strict";

/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 */
module.exports = function (selector) {
  browser.scroll(selector);
};