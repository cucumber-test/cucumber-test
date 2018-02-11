"use strict";

/**
 * Submit the given form
 * @param  {String}   form Form element selector
 */
module.exports = function (form) {
  browser.submitForm(form);
};