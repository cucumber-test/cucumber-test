"use strict";

/**
 * Pause execution for a given number of milliseconds
 * @param  {String}   ms   Number of milliseconds to pause
 */
module.exports = function (ms) {
  /**
   * Number of milliseconds
   * @type {Int}
   */
  var intMs = parseInt(ms, 10);

  browser.pause(intMs);
};