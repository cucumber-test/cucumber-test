'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs-extra');
var chalk = require('chalk');
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();
var path = process.cwd();
var error = chalk.bold.red;

var traverseFileSystem = function traverseFileSystem(currentPath) {
    var files = fs.readdirSync(currentPath);
    var files2 = [];
    for (var i in files) {
        var currentFile = currentPath + '/' + files[i];
        var stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            if (currentFile.match(/\.feature$/)) {
                files2.push(currentFile);
            }
        } else if (stats.isDirectory()) {
            files2 = files2.concat(traverseFileSystem(currentFile));
        }
    }
    return files2;
};
var features = traverseFileSystem('flib');

var files = [];
var children = [];
features.forEach(function (f) {
    if (!f.match('/@')) {
        var share = path + '/' + f;
        var doc = fs.readFileSync(share, 'utf8');
        var ftr = parser.parse(doc).feature;
        var arr = [];
        ftr.children.forEach(function (o) {
            children.filter(function (x) {
                if (o.name === x.name) {
                    console.log('\n==> ' + files.join('\n==> '));
                    console.log(error('==> ' + f + ': ' + o.name + ' -> Duplicate scenario!!!\n'));
                    process.exit(1);
                }
            });
        });
        children = children.concat(ftr.children);
        files.push(f);
    }
});

function mixParser(file) {
    var fit = process.cwd() + '/' + file;
    var src = fs.readFileSync(fit, 'utf8');
    var ast = parser.parse(src);

    var tgfile = void 0;
    var exp = [];
    var ftr = ast.feature;

    if (ftr.tags.length > 0) {
        exp.push(ftr.tags.map(function (o) {
            return o.name;
        }).join(' '));
    }

    exp.push(ftr.type + ': ' + ftr.name);
    exp.push(ftr.description);

    function addScenario(o, tags) {
        var libTags = [].concat(_toConsumableArray(o.tags || []));
        var newTags = [].concat(_toConsumableArray(tags || []));

        var mergeTags = libTags.map(function (item) {
            var nameKey = item.name.split(':')[0];
            var idx = newTags.findIndex(function (obj) {
                return obj.name.split(':')[0] === nameKey;
            });
            var tag = idx > -1 ? newTags[idx] : item;
            if (idx > -1) {
                newTags.splice(idx, 1);
            }
            return tag;
        });
        mergeTags = [].concat(_toConsumableArray(mergeTags), _toConsumableArray(newTags));

        exp.push('');
        if (mergeTags.length > 0) {
            exp.push(mergeTags.map(function (obj) {
                return obj.name;
            }).join(' '));
        }

        exp.push(o.keyword + ': ' + o.name);
        if (o.steps.length > 0) {
            o.steps.forEach(function (s) {
                exp.push('    ' + s.keyword + s.text);
            });
        }
    }

    function searchOnflib(o) {
        var arr = children.filter(function (x) {
            var result = o.name === x.name;
            if (result) {
                addScenario(x, o.tags);
            }
            return result;
        });
        if (arr.length === 0) {
            addScenario(o);
        }
    }

    ftr.children.forEach(function (o) {
        if (o.name.match(/^@/)) {
            var xfile = features.filter(function (f) {
                return f.match(o.name);
            })[0];
            var src2 = fs.readFileSync(xfile, 'utf8');
            var ast2 = parser.parse(src2);
            ast2.feature.children.forEach(function (o2) {
                searchOnflib(o2);
            });
        } else {
            searchOnflib(o);
        }
    });

    var content = exp.join('\n');
    var feature = 'features/' + file.replace(/^fits\//, '');
    var arr = feature.split('/');
    var dir = arr.splice(0, arr.length - 1).join('/');

    tgfile = path + '/' + feature;
    fs.ensureDirSync(path + '/' + dir);
    fs.writeFileSync(tgfile, content, 'utf8');
    return tgfile;
}

module.exports = {
    traverseFileSystem: traverseFileSystem,
    feature: function feature(filter) {
        fs.removeSync('features/' + filter);
        var arr = traverseFileSystem('fits/' + filter);
        return arr.map(function (f) {
            return mixParser(f);
        });
    }
};