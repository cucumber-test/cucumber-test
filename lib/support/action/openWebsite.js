'use strict';

/**
 * Open the given URL
 * @param  {String}   type Type of navigation (url or site)
 * @param  {String}   page The URL to navigate to
 */
module.exports = function (type, page) {
  /**
   * The URL to navigate to
   * @type {String}
   */
  var url = type === 'url' ? page : browser.options.baseUrl + page;

  browser.url(url);
};