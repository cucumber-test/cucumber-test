"use strict";

/**
 * Select a option from a select element by it's index
 * @param  {String}   index      The index of the option
 * @param  {String}   obsolete   The ordinal indicator of the index (unused)
 * @param  {String}   selectElem Element selector
 *
 * @todo  merge with selectOption
 */
module.exports = function (index, obsolete, selectElem) {
  /**
   * The index of the option to select
   * @type {Int}
   */
  var optionIndex = parseInt(index, 10);

  browser.selectByIndex(selectElem, optionIndex);
};