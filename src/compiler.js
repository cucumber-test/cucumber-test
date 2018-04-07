const fs = require('fs-extra')
var Gherkin = require('gherkin');
var parser = new Gherkin.Parser();

const share = process.cwd()+'/fits/share.feature';
const doc = fs.readFileSync(share, 'utf8');
const scs = parser.parse(doc);

function mixParser(file) {
    const fit = `${process.cwd()}/${file}`;
    const src = fs.readFileSync(fit, 'utf8');
    const ast = parser.parse(src);

    const exp = [];
    const ftr = ast.feature;
    if (ftr.tags.length>0) {
        exp.push(ftr.tags.map(o => o.name).join(' '));
    }
    exp.push(`${ftr.type}: ${ftr.name}`);
    exp.push(ftr.description);

    function addScenario(o, t) {
        exp.push('');
        const tags = o.tags.length>0 ? o.tags : (t.length>0 ? t : []);
        if (tags.length>0) {
            exp.push(tags.map(t => t.name).join(' '));
        }
        exp.push(`${o.keyword}: ${o.name}`);
        if (o.steps.length>0) {
            o.steps.forEach(s => {
                exp.push(`    ${s.keyword}${s.text}`);
            })
        }
    }

    const {children} = scs.feature;
    ftr.children.forEach(o => {
        const arr = children.filter(x => {
            const result = o.name===x.name;
            if (result) {
                addScenario(x, o.tags);
            }
            return result
        });
        if (arr.length===0) {
            addScenario(o);
        }
    })

    const content = exp.join('\n');
    const feature = `features/${file.replace(/^fits\//,'')}`;
    const arr = feature.split('/');
    const dir = arr.splice(0,arr.length-1).join('/');
    fs.ensureDir(`${process.cwd()}/${dir}`, err => {
        const file = `${process.cwd()}/${feature}`;
        !err && fs.writeFileSync(file, content, 'utf8');
    })
}

let features = [];
const traverseFileSystem = function (currentPath) {
    const files = fs.readdirSync(currentPath);
    for (var i in files) {
        const currentFile = currentPath + '/' + files[i];
        const stats = fs.statSync(currentFile);
        if (stats.isFile()) {
            if (currentFile.match(/\.feature$/)) {
                features.push(currentFile);
            }
        } else if (stats.isDirectory()) {
            traverseFileSystem(currentFile);
        }
    }
};

module.exports = (filter) => {
    features = [];
    traverseFileSystem(`fits/${filter}`);
    features.forEach(f => mixParser(f));
}
