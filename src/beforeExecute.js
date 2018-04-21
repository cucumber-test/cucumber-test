const fs = require('fs');
const faker = require('faker');
const Chance = require('chance');
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
     * Setup the Chai assertion framework
     */
    const chai = require('chai');
    const chance = new Chance();

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    const config = require(global.browser.options.cpath)({webdriverio, faker, chance, request});
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
