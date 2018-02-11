'use strict';

/**
 * Check the dimensions of the given element
 * @param  {String}   elem         Element selector
 * @param  {String}   falseCase    Whether to check if the dimensions match or
 *                                 not
 * @param  {String}   expectedSize Expected size
 * @param  {String}   dimension    Dimension to check (broad or tall)
 */
module.exports = function (elem, falseCase, expectedSize, dimension) {
    /**
     * The size of the given element
     * @type {Object}
     */
    var elementSize = browser.getElementSize(elem);

    /**
     * Parsed size to check for
     * @type {Int}
     */
    var intExpectedSize = parseInt(expectedSize, 10);

    /**
     * The size property to check against
     * @type {Int}
     */
    var origionalSize = elementSize.height;

    /**
     * The label of the checked property
     * @type {String}
     */
    var label = 'height';

    if (dimension === 'broad') {
        origionalSize = elementSize.width;
        label = 'width';
    }

    if (falseCase) {
        expect(origionalSize).to.not.equal(intExpectedSize, 'Element "' + elem + '" should not have a ' + label + ' of ' + (intExpectedSize + 'px'));
    } else {
        expect(origionalSize).to.equal(intExpectedSize, 'Element "' + elem + '" should have a ' + label + ' of ' + (intExpectedSize + 'px, but is ' + origionalSize + 'px'));
    }
};