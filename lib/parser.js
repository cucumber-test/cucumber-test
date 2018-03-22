'use strict';

var browserTags = ['@__chrome', '@__safari', '@__firefox', '@__microsoftedge', '@__internetexplorer'];
var nonBrowserTags = ['@__non_chrome', '@__non_safari', '@__non_firefox', '@__non_microsoftedge', '@__non_internetexplorer'];
var mobileTags = ['@__android', '@__mobile', '@__ios'];
var nonMobileTags = ['@__non_android', '@__non_mobile', '@__non_ios'];

function browserName() {
    var browserName = global.browser.desiredCapabilities.browserName;

    return browserName.toLowerCase().replace(/ /g, '');
}

function isBrowserTag(tagName) {
    var browserId = browserName();
    var arr = tagName.split('||');
    if (browserTags.indexOf(arr[0]) > -1) {
        if (arr[0] === '@__' + browserId) {
            return 1;
        } else if (arr.length > 1) {
            return isMobileTag('@__' + arr[1]);
        } else {
            return 0;
        }
    }
    if (nonBrowserTags.indexOf(arr[0]) > -1) {
        return arr[0] === '@__non_' + browserId ? 0 : 1;
    }
    return 1;
}

function isMobileTag(tagName) {
    var chkMobiles = {
        '@__android': global.browser.isAndroid,
        '@__mobile': global.browser.isMobile,
        '@__ios': global.browser.isIOS
    };
    var chkNonMobiles = {
        '@__non_android': !global.browser.isAndroid,
        '@__non_mobile': !global.browser.isMobile,
        '@__non_ios': !global.browser.isIOS
    };
    if (mobileTags.indexOf(tagName) > -1) {
        return chkMobiles[tagName] ? 1 : 0;
    }
    if (nonMobileTags.indexOf(tagName) > -1) {
        return chkNonMobiles[tagName] ? 1 : 0;
    }
    return 1;
}

module.exports = function (event) {
    var vars = global.browser.options.vars;


    console.log('>>>>>', '@__' + browserName());
    event.scenarios = event.scenarios.filter(function (x) {

        // share feature
        var fname = x.name.trim();
        if (x.steps.length === 1 && x.steps[0].name === '...') {
            global.shareGherkinFeature.children.forEach(function (gScenario) {
                if (fname === gScenario.name) {
                    x.steps = gScenario.steps.map(function (gk) {
                        var _x$steps$ = x.steps[0],
                            uri = _x$steps$.uri,
                            line = _x$steps$.line,
                            scenario = _x$steps$.scenario,
                            isBackground = _x$steps$.isBackground;

                        return {
                            uri: uri,
                            line: line,
                            scenario: scenario,
                            isBackground: isBackground,
                            arguments: [],
                            name: gk.text,
                            keyword: gk.keyword,
                            keywordType: gk.type
                        };
                    });
                }
            });
        }

        // variable parser
        x.steps.forEach(function (obj) {
            var varNames = obj.name.match(/\${([A-z.]+)}/g);
            if (varNames) {
                varNames.forEach(function (varName) {
                    var items = vars;
                    varName.replace(/[${}]/g, '').trim().split('.').forEach(function (i) {
                        if (items !== undefined) items = items[i];
                    });
                    if (items !== undefined) {
                        obj.name = obj.name.replace(varName, items);
                    }
                });
            }
        });
        if (x.tags.length > 0) {
            var isBrowserTags = x.tags.map(function (y) {
                return isBrowserTag(y.name);
            }).sort();
            var isMobileTags = x.tags.map(function (y) {
                return isMobileTag(y.name);
            }).sort();
            return isBrowserTags[0] + isMobileTags[0] === 2;
        }
        return true;
    });
};