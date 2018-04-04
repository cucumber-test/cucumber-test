'use strict';

var fs = require('fs');
var faker = require('faker');
var request = require('request');
var Gherkin = require('gherkin');
var _merge = require('lodash/merge');
var webdriverio = require('webdriverio');
var Launcher = webdriverio.Launcher;

var parser = new Gherkin.Parser();

module.exports = function () {
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
            return new Promise(function (resolve, reject) {
                var options = { desiredCapabilities: { browserName: 'chrome' } };
                var client = webdriverio.remote(options);
                var timer = void 0;
                function resolved(result) {
                    if (timer) {
                        clearTimeout(timer);
                        client.close();
                        timer = null;
                        resolve(result);
                    }
                }
                fn(client, resolved, reject);
                timer = setTimeout(function () {
                    client.close();
                    reject('Timeout at: @__wd !');
                }, browser.options.cucumberOpts.timeout);
            });
        });
    });

    /**
     * Setup the Chai assertion framework
     */
    var chai = require('chai');

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    var config = require(global.browser.options.cpath)({ webdriverio: webdriverio, faker: faker, request: request });
    global.tags = config.tags || {};
    global.vars = config.vars || {};

    var vars = global.browser.options.vars;

    global.vars = _merge(global.vars, vars);

    global.shareGherkinFeature = {};
    var fshare = process.cwd() + '/features/share.feature';
    if (fs.existsSync(fshare)) {
        var data = fs.readFileSync(fshare, 'utf8');
        var gherkinAst = parser.parse(data);
        global.shareGherkinFeature = gherkinAst.feature;
        // console.log('AST', global.shareGherkinFeature);
    }

    if (process.argv.indexOf('--uaIphone') !== -1) {
        console.log('setViewportSize: { width: 414, height: 736 }');
        global.browser.setViewportSize({ width: 414, height: 736 });
    } else if (process.argv.indexOf('--uaGalaxy') !== -1) {
        console.log('setViewportSize: { width: 414, height: 736 }');
        global.browser.setViewportSize({ width: 414, height: 736 });
    } else if (!global.browser.isMobile) {
        global.browser.windowHandleSize({ width: 1240, height: 768 });
    }
};