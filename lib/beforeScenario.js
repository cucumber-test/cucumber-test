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

function waitUrl(partial) {
    var msg = 'expected ' + partial + ' is part of current url after 5s';
    browser.waitUntil(function () {
        return url(partial);
    }, 5000, msg);
}

var ftags = {
    '@__url': url,
    '@__non_url': nonUrl,
    '@__waitUrl': waitUrl
};

module.exports = function (event) {
    var _global = global,
        tags = _global.tags,
        vars = _global.vars;

    var isRemove = false;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = event.tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tag = _step.value;

            var arr = tag.name.split(':');
            var fn = tags[arr[0]];
            var ft = ftags[arr[0]];

            if (ft) {
                isRemove = !ft(arr[1]);
            }

            if (!isRemove && fn) {
                isRemove = !fn(browser, global.vars, arr[1]);
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