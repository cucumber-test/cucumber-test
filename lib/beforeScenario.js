'use strict';

module.exports = function (event) {
    var url = browser.execute(function () {
        return location.href;
    }).value;
    var _global = global,
        tags = _global.tags,
        vars = _global.vars;

    var isRemove = false;

    event.tags.forEach(function (tag) {
        var arr = tag.name.split(':');
        var fn = tags[arr[0]];

        if (!isRemove && arr[1]) {
            if (url.match(arr[1])) {
                isRemove = arr[0] === '@__non_url';
            } else {
                isRemove = arr[0] === '@__url';
            }
        }
        if (isRemove) {
            event.tags = [];
            event.name = '';
            event.steps = [];
        } else {
            if (fn) {
                console.log('>>>>>', arr[0]);
                isRemove = !fn(browser, global.vars, arr[1]);
            }
        }
    });
    // variable parser
    event.steps.forEach(function (step) {
        var varNames = step.name.match(/\${([A-z.]+)}/g);
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