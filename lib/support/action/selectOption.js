'use strict';

/**
 * Select an option of a select element
 * @param  {String}   selectionType  Type of method to select by (name, value or
 *                                   text)
 * @param  {String}   selectionValue Value to select by
 * @param  {String}   selectElem     Element selector
 */
module.exports = function (selectionType, selectionValue, selectElem) {
    var _browser;

    /**
     * Arguments to pass to the selection method
     * @type {Array}
     */
    var commandArguments = [selectElem, selectionValue];

    /**
     * The method to use for selecting the option
     * @type {String}
     */
    var command = '';

    switch (selectionType) {
        case 'name':
            {
                command = 'selectByAttribute';

                // The selectByAttribute command expects the attribute name as it
                // second argument so let's add it
                commandArguments.splice(1, 0, 'name');

                break;
            }

        case 'value':
            {
                command = 'selectByValue';
                break;
            }

        case 'text':
            {
                command = 'selectByVisibleText';
                break;
            }

        default:
            {
                throw new Error('Unknown selection type "' + selectionType + '"');
            }
    }

    (_browser = browser)[command].apply(_browser, commandArguments);
};