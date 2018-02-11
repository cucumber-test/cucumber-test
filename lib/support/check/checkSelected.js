"use strict";

/**
 * Check the selected state of the given element
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or
 *                              not
 */
module.exports = function (element, falseCase) {
    /**
     * The selected state
     * @type {Boolean}
     */
    var isSelected = browser.isSelected(element);

    if (falseCase) {
        expect(isSelected).to.not.equal(true, "\"" + element + "\" should not be selected");
    } else {
        expect(isSelected).to.equal(true, "\"" + element + "\" should be selected");
    }
};