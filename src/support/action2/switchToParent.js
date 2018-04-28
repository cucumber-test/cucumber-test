/**
 * Switch from iframe to Parent Window
 */

 function browserName() {
     const {browserName} = global.browser.desiredCapabilities;
     return browserName.toLowerCase().replace(/ /g,'');
 }

 module.exports = () => {
    if (browserName()!=='firefox') {
        // must not have wait in here!
        browser.frameParent();
        browser.pause(1000, '*internal*');
    } else {
        browser.pause(500, '*internal*');
        browser.frame();
        browser.pause(500, '*internal*');
    }
};
