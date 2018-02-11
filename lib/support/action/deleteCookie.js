"use strict";

/**
 * Delete a cookie
 * @param  {String}   name The name of the cookie to delete
 */
module.exports = function (name) {
  browser.deleteCookie(name);
};