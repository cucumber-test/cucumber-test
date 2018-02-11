'use strict';

/**
 * Wait for the given element to become visible
 * @param  {String}   elem      Element selector
 * @param  {String}   falseCase Whether or not to expect a visible or hidden
 *                              state
 *
 * @todo  merge with waitfor
 */
module.exports = function (elem, falseCase) {
  /**
   * Maximum number of milliseconds to wait for
   * @type {Int}
   */
  var ms = 10000;
  browser.pause(1000, '*internal*');
  browser.waitForVisible(elem, ms, !!falseCase);
};