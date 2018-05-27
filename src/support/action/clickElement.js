import checkIfElementExists from '../lib/checkIfElementExists';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   element Element selector
 */
module.exports = (action, type, element) => {
    /**
     * Element to perform the action on
     * @type {String}
     */
    const arr = element.split('|');
    const elem = (type === 'link') ? `=${arr[0]}` : arr[0];

    /**
     * The method to call on the browser object
     * @type {String}
     */
    const method = (action === 'click') ? 'click' : 'doubleClick';

    checkIfElementExists(elem);

    browser.pause(1000, '*internal*');
    browser[method](elem);
    if (arr[1]) {
        browser.pause(+arr[1], '*internal*');
    }
};
