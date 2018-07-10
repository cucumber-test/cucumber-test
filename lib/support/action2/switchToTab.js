'use strict';

/**
 * Switch to the next tab
 */
module.exports = () => {
  browser.switchTab();
  browser.pause(1000, '*internal*');
};