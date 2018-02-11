"use strict";

/**
 * Perform a key press
 * @param  {String}   key  The key to press
 */
module.exports = function (key) {
  browser.keys(key);
};