import waitForVisible from '../action/waitForVisible';
import clickElement from '../action/clickElement';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   element Element selector
 */
module.exports = (action, type, element) => {
    waitForVisible(element.split('|')[0]);
    clickElement(action, type, element);
};
