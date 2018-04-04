module.exports = event => {
    const url = browser.execute(() => location.href).value;
    const {tags, vars} = global;
    let isRemove = false;

    event.tags.forEach(tag => {
        const arr = tag.name.split(':');
        const fn = tags[arr[0]];

        if (!isRemove && arr[1]) {
            if (url.match(arr[1])) {
                isRemove = (arr[0]==='@__non_url');
            } else {
                isRemove = (arr[0]==='@__url');
            }
        }
        if (isRemove) {
            event.tags = [];
            event.name = '';
            event.steps = [];
        } else {
            if (fn) {
                console.log('>>>>>',arr[0]);
                isRemove = !fn(browser, global.vars, arr[1]);
            }
        }
    })
    // variable parser
    event.steps.forEach(step => {
        const varNames = step.name.match(/\${([A-z0-9_.]+)}/g);
        if (varNames) {
            varNames.forEach(varName=> {
                let items = vars;
                varName.replace(/[${}]/g,'').trim().split('.').forEach(i => {
                    if (items!==undefined)
                        items = items[i];
                })
                if (items!==undefined) {
                    step.name = step.name.replace(varName, items);
                }
            })
        }
    })
}
