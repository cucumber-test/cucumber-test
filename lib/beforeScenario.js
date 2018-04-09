'use strict';

module.exports = function (event) {
    var url = browser.execute(function () {
        return location.href;
    }).value;
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

            if (arr[1]) {
                if (url.match(arr[1])) {
                    isRemove = arr[0] === '@__non_url';
                } else {
                    isRemove = arr[0] === '@__url';
                }
            }
            if (!isRemove && fn) {
                console.log('>>>>>', arr[0]);
                isRemove = !fn(browser, global.vars, arr[1]);
            }
            if (isRemove) {
                event.tags = [];
                event.name = '';
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