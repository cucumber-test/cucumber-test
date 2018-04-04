const fs = require('fs');
const faker = require('faker');
const request = require('request');
const Gherkin = require('gherkin');
const _merge = require('lodash/merge');
const webdriverio = require('webdriverio');
const { Launcher } = webdriverio;
const parser = new Gherkin.Parser();

module.exports = () => {
    // browser.addCommand("subProcess", function (fn) {
    //     var wdio = new Launcher(`${__dirname}/config.js`);
    //     wdio.run().then(function (code) {
    //         // process.exit(code);
    //     }, function (error) {
    //         console.error('Launcher failed to start the test', error.stacktrace);
    //         // process.exit(1);
    //     });
    // });

    browser.addCommand("chromeClient", function (fn) {
        return browser.call(function () {
            return new Promise(function(resolve, reject) {
                const options = { desiredCapabilities: { browserName: 'chrome' } };
                const client = webdriverio.remote(options);
                let timer;
                function resolved(result) {
                    if (timer) {
                        clearTimeout(timer);
                        client.close();
                        timer = null;
                        resolve(result);
                    }
                }
                fn(client, resolved, reject);
                timer = setTimeout(function() {
                    client.close();
                    reject('Timeout at: @__wd !');
                }, browser.options.cucumberOpts.timeout);
            })
        });
    });

    /**
     * Recursive function to ensure the correct text.
     *
     * This command is created in order to compensate the setValue() bug.
     * The method (setValue) does not always set the correct value,
     * sometimes it just misses some characters.
     * This function sets each character at a time and recursively validates
     * that the character is actually entered.
     *
     * @param {String} selector
     *   The selector string to grab the element by.
     * @param {String} text
     *   The text that we want to set as a value.
     */
    browser.addCommand('setValueSafe', (selector, text) => {

      let

        /**
         * Tackle the even weirder decision of WebDriver.io trim the spaces
         * of every property value. Even the "value" property's value.
         * I understand this for class or href properties but not for value.
         * You can see it here : https://github.com/webdriverio/webdriverio/blob/acdd79bff797b295d2196b3616facc9005b6f17d/lib/webdriverio.js#L463
         *
         * @param {String} elementId
         *   ID of a WebElement JSON object of the current element.
         *
         * @return {String}
         *   The value of the `value` attribute.
         */
        getActualText = elementId =>
          browser
            .elementIdAttribute(elementId, 'value')
            .value
        ,

        /**
         * Recursively sets the specified character.
         *
         * @param {String} elementId
         *   ID of a WebElement JSON object of the current element.
         * @param {String} text
         *   The entire text to set.
         * @param {Number} i
         *   The index of the current iteration over the string.
         */
        setChar = (elementId, text, i) => {
          const
            currentChar  = text[i],
            expectedText = text.slice(0, i + 1);

          // Send keystroke.
          browser.elementIdValue(elementId, currentChar);

          // Wait for text to be actually entered. If fails - Recurse.
          // When fails after 1000ms we assume the request was somehow destroyed
          // so we activate again.
          const inputPause = browser.options.base.inputPause || 500;
          try {
            browser
              .waitUntil(() => getActualText(elementId) == expectedText, inputPause, "failed", 16)
          } catch (e) {
            setChar(elementId, text, i);
          }
        };

      // Get the ID of the selected elements WebElement JSON object.
      const elementId = browser.element(selector).value.ELEMENT;

      // Clear the input before entering new value.
      browser.elementIdClear(elementId);
      browser.waitUntil(() => getActualText(elementId) == '');

      // Set each character of the text separately with setChar().
      for (let i = 0; i < text.length; i++) {
        setChar(elementId, text, i);
      }
    });

    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    const config = require(global.browser.options.cpath)({webdriverio, faker, request});
    global.tags = config.tags || {};
    global.vars = config.vars || {};

    const {vars} = global.browser.options;
    global.vars = _merge(global.vars, vars);

    global.shareGherkinFeature = {}
    const fshare = process.cwd()+'/features/share.feature';
    if (fs.existsSync(fshare)) {
        var data = fs.readFileSync(fshare, 'utf8');
        var gherkinAst = parser.parse(data);
        global.shareGherkinFeature = gherkinAst.feature;
        // console.log('AST', global.shareGherkinFeature);
    }

    if (process.argv.indexOf('--uaIphone')!==-1) {
        console.log('setViewportSize: { width: 414, height: 736 }');
        global.browser.setViewportSize({ width: 414, height: 736 });
    } else if (process.argv.indexOf('--uaGalaxy')!==-1) {
        console.log('setViewportSize: { width: 414, height: 736 }');
        global.browser.setViewportSize({ width: 414, height: 736 });
    } else if (!global.browser.isMobile) {
        global.browser.windowHandleSize({width: 1240, height: 768});
    }
}
