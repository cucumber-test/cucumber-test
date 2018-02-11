"use strict";

/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   element Element selector
 */
module.exports = function (element) {
  browser.clearElement(element);
};