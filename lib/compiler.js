'use strict';

var fs = require('fs-extra');
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();

var share = process.cwd() + '/fits/share.feature';
var doc = fs.readFileSync(share, 'utf8');
var scs = parser.parse(doc);

function mixParser(file) {
    var fit = process.cwd() + '/' + file;
    var src = fs.readFileSync(fit, 'utf8');
    var ast = parser.parse(src);

    var exp = [];
    var ftr = ast.feature;
    if (ftr.tags.length > 0) {
        exp.push(ftr.tags.map(function (o) {
            return o.name;
        }).join(' '));
    }
    exp.push(ftr.type + ': ' + ftr.name);
    exp.push(ftr.description);

    function addScenario(o, t) {
        exp.push('');
        var tags = o.tags.length > 0 ? o.tags : t.length > 0 ? t : [];
        if (tags.length > 0) {
            exp.push(tags.map(function (t) {
                return t.name;
            }).join(' '));
        }
        exp.push(o.keyword + ': ' + o.name);
        if (o.steps.length > 0) {
            o.steps.forEach(function (s) {
                exp.push('    ' + s.keyword + s.text);
            });
        }
    }

    var children = scs.feature.children;

    ftr.children.forEach(function (o) {
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
    });

    var content = exp.join('\n');
    var feature = 'features/' + file.replace(/^fits\//, '');
    var arr = feature.split('/');
    var dir = arr.splice(0, arr.length - 1).join('/');
    fs.ensureDir(process.cwd() + '/' + dir, function (err) {
        var file = process.cwd() + '/' + feature;
        !err && fs.writeFileSync(file, content, 'utf8');
    });
}

var features = [];
var traverseFileSystem = function traverseFileSystem(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
        var currentFile = currentPath + '/' + files[i];
        var stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            if (currentFile.match(/\.feature$/)) {
                features.push(currentFile);
            }
        } else if (stats.isDirectory()) {
            traverseFileSystem(currentFile);
        }
    }
};

module.exports = function (filter) {
    features = [];
    traverseFileSystem('fits/' + filter);
    features.forEach(function (f) {
        return mixParser(f);
    });
};