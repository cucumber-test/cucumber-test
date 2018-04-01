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
    var newScenarios = [];

    console.log('>>>>>', '@__' + browserName());
    event.scenarios.forEach(function (xObj, xId) {
        // share feature
        var fname = xObj.name.trim();
        if (xObj.steps.length === 1 && xObj.steps[0].name === '...') {
            global.shareGherkinFeature.children.forEach(function (gScenario) {
                if (fname === gScenario.name) {
                    var cloneObj = Object.assign({}, xObj);
                    // console.log('XXX>>>',xId,gScenario,xObj)
                    if (gScenario.tags.length > 0) {
                        cloneObj.tags = gScenario.tags.map(function (tg) {
                            return {
                                line: 0,
                                name: tg.name
                            };
                        });
                    }
                    cloneObj.steps = gScenario.steps.map(function (gk) {
                        var _xObj$steps$ = xObj.steps[0],
                            uri = _xObj$steps$.uri,
                            line = _xObj$steps$.line,
                            scenario = _xObj$steps$.scenario,
                            isBackground = _xObj$steps$.isBackground;

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
                    newScenarios.push(cloneObj);
                }
            });
        } else {
            newScenarios.push(xObj);
        }
    });

    event.scenarios = newScenarios.filter(function (xObj) {
        if (xObj.tags.length > 0) {
            var isBrowserTags = xObj.tags.map(function (y) {
                return isBrowserTag(y.name);
            }).sort();
            var isMobileTags = xObj.tags.map(function (y) {
                return isMobileTag(y.name);
            }).sort();
            return isBrowserTags[0] + isMobileTags[0] === 2;
        }
        return true;
    });
};