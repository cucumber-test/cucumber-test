'use strict';

/**
 * Switch from iframe to Parent Window
 */

function browserName() {
    const { browserName } = global.browser.desiredCapabilities;
    return browserName.toLowerCase().replace(/ /g, '');
}

module.exports = () => {
    // no wait in here!
    if (browserName() === 'firefox') {
        browser.frame();
    } else {
        browser.frameParent();
    }
    browser.pause(1000, '*internal*');
};