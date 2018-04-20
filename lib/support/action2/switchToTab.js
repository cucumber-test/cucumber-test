'use strict';

/**
 * Switch to the next tab
 */
module.exports = function () {
  browser.switchTab();
  browser.pause(1000, '*internal*');
};