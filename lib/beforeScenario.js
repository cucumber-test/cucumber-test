'use strict';

module.exports = function (event) {
    var url = browser.execute(function () {
        return location.href;
    }).value;
    var _global = global,
        tags = _global.tags,
        vars = _global.vars;


    event.tags.forEach(function (tag) {
        var keys = tag.name.match(/@(__\w+)/);
        if (keys) {
            var isRemove = false;
            var arr = tag.name.split(':');
            if (arr[1]) {
                if (url.match(arr[1])) {
                    // url match with tag should be removed
                    isRemove = arr[0] === '@__non_url';
                } else {
                    // url not match with tag should be removed
                    isRemove = arr[0] === '@__url';
                }
            }
            var fn = tags[keys[1]];
            if (fn && !isRemove) {
                console.log('>>>>>', arr[0]);
                isRemove = !fn(global.vars, arr[1]);
            }
            if (isRemove) {
                event.tags = [];
                event.name = '';
                event.steps = [];
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