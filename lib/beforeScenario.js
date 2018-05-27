'use strict';

function url(partial) {
    var url = browser.execute(function () {
        return location.href;
    }).value;
    return !!url.match(partial);
}

function nonUrl(partial) {
    return !url(partial);
}

function waitForUrl(partial) {
    var arr = partial.split('|');
    var timeout = +(arr[1] || 2000);
    var screenshotPath = browser.options.screenshotPath;

    try {
        browser.options.screenshotPath = null;
        var result = browser.waitUntil(function () {
            return url(arr[0]);
        }, timeout);
        browser.options.screenshotPath = screenshotPath;
        return result;
    } catch (e) {
        browser.options.screenshotPath = screenshotPath;
        return false;
    }
}

function main_url(browser, vars, string) {
    return browser.getUrl().match(string) !== null;
}

function non_main_url(browser, vars, string) {
    return browser.getUrl().match(string) === null;
}

function slc(string) {
    if (string.match(/^\/\//)) {
        string = string.replace(/(\[)(\w+=)/g, '$1@$2');
    }
    return browser.isExisting(string);
}

function getCookie(string) {
    var names = [],
        cookies = {};
    string.split(/, */).forEach(function (x) {
        var kv = x.split('=');
        if (kv.length > 1) {
            names.push(kv[0]);
            cookies[kv[0]] = kv[1];
        }
    });

    var cookielist = browser.execute(function () {
        return document.cookie;
    }).value;
    // console.log('cookies', cookielist, cookies);
    function getCookie(name) {
        var v = cookielist.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var name = _step.value;

            if (cookies[name] !== getCookie(name)) {
                return false;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return true;
}

function debug(browser, vars, string) {
    browser.debug();
    return true;
}

var ftags = {
    '@__$': slc,
    '@__url': url,
    '@__mainUrl': main_url,
    '@__cookies': getCookie,
    '@__waitForUrl': waitForUrl,
    '@__debug': debug,
    '@__non_url': nonUrl,
    '@__non_mainUrl': non_main_url
};

module.exports = function (event) {
    var _global = global,
        tags = _global.tags,
        vars = _global.vars;

    var rgtags = /(^@__[_\w|\$]+):(.+)/;
    var isRemove = false;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = event.tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var tag = _step2.value;

            var mc = tag.name.match(rgtags);
            var kv = mc ? mc.splice(1, 2) : tag.name.split(':');
            var fn = tags[kv[0]];
            var ft = ftags[kv[0]];

            if (ft) {
                isRemove = !ft(kv[1]);
            }

            if (!isRemove && fn) {
                isRemove = !fn(browser, global.vars, kv[1]);
            }

            if (isRemove) {
                event.tags = [];
                event.name = '...';
                event.steps = [];
                break;
            }
        }

        // variable parser
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    event.steps.forEach(function (step) {
        var varNames = step.name.match(/\${([A-z0-9_.]+)}/g);
        if (varNames) {
            varNames.forEach(function (varName) {
                var items = vars;
                varName.replace(/[${}]/g, '').trim().split('.').forEach(function (i) {
                    if (items !== undefined) items = items[i];
                });
                if (items !== undefined) {
                    step.name = step.name.replace(varName, items);
                }
            });
        }
    });
};