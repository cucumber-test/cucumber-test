const fs = require('fs-extra')
const chalk = require('chalk');
const Gherkin = require('gherkin');
const parser = new Gherkin.Parser();
const path = process.cwd();
const error = chalk.bold.red;

const traverseFileSystem = function (currentPath) {
    const files = fs.readdirSync(currentPath);
    let files2 = [];
    for (let i in files) {
        const currentFile = currentPath + '/' + files[i];
        const stats = fs.statSync(currentFile);
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
const features = traverseFileSystem(`flib`);

let files = [];
let children = [];
features.forEach(f => {
    const share = `${path}/${f}`;
    const doc = fs.readFileSync(share, 'utf8');
    const ftr = parser.parse(doc).feature;
    let arr = [];
    ftr.children.forEach(o => {
        children.filter(x => {
            if (o.name===x.name) {
                console.log(`\n==> ${files.join('\n==> ')}`);
                console.log(error(`==> ${f}: ${o.name} -> Duplicate scenario!!!\n`));
                process.exit(1);
            }
        });
    })
    children = children.concat(ftr.children);
    files.push(f);
});

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

    function addScenario(o, tags) {
        const libTags = [...(o.tags || [])];
        let newTags = [...(tags || [])];

        let mergeTags = libTags.map(item => {
            const nameKey = item.name.split(':')[0];
            const idx = newTags.findIndex(obj => obj.name.split(':')[0] === nameKey);
            const tag = (idx > -1 ? newTags[idx] : item);
            if (idx > -1) {
                newTags.splice(idx, 1);
            }
            return tag;
        });
        mergeTags = [...mergeTags, ...newTags];

        exp.push('');
        if (mergeTags.length>0) {
            exp.push(mergeTags.map(obj => obj.name).join(' '));
        }

        exp.push(`${o.keyword}: ${o.name}`);
        if (o.steps.length>0) {
            o.steps.forEach(s => {
                exp.push(`    ${s.keyword}${s.text}`);
            })
        }
    }

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

    fs.remove(`${path}/${dir}`, err => {
        if (err) {
            console.log(error(`==> ${err}`));
            process.exit(1);
        } else {
            fs.ensureDir(`${path}/${dir}`, err => {
                const file = `${path}/${feature}`;
                !err && fs.writeFileSync(file, content, 'utf8');
            })
        }
    });
}

module.exports = { 
    traverseFileSystem,
    feature: (filter) => {
        const arr = traverseFileSystem(`fits/${filter}`);
        arr.forEach(f => mixParser(f));
    }
}
