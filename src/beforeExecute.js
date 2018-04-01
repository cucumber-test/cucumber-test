const fs = require('fs');
const faker = require('faker');
const Gherkin = require('gherkin');
const _merge = require('lodash/merge');
var parser = new Gherkin.Parser();

module.exports = () => {
    /**
     * Setup the Chai assertion framework
     */
    const chai = require('chai');
    const config = require(global.browser.options.cpath)(faker);

    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();
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
