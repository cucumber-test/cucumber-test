'use strict';

/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   element       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  the given text or not
 * @param  {String}   expectedText  The text to check against
 */
module.exports = function (elementType, element, falseCase, expectedText) {
    /**
     * The command to perform on the browser object
     * @type {String}
     */
    var command = 'getValue';

    if (elementType === 'button' || browser.getAttribute(element, 'value') === null) {
        command = 'getText';
    }

    /**
     * False case
     * @type {Boolean}
     */
    var boolFalseCase = void 0;

    /**
     * The expected text
     * @type {String}
     */
    var stringExpectedText = expectedText;

    /**
     * The text of the element
     * @type {String}
     */
    var text = browser[command](element);

    if (typeof expectedText === 'undefined') {
        stringExpectedText = falseCase;
        boolFalseCase = false;
    } else {
        boolFalseCase = falseCase === ' not';
    }

    if (boolFalseCase) {
        expect(text).to.not.contain(stringExpectedText);
    } else {
        expect(text).to.contain(stringExpectedText);
    }
};