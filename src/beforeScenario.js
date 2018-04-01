module.exports = event => {
    const url = browser.execute(() => location.href).value;
    const {tags, vars} = global;

    event.tags.forEach(tag => {
        const keys = tag.name.match(/@(__\w+)/);
        if (keys) {
            let isRemove = false;
            const arr = tag.name.split(':');
            if (arr[1]) {
                if (url.match(arr[1])) {
                    // url match with tag should be removed
                    isRemove = (arr[0]==='@__non_url');
                } else {
                    // url not match with tag should be removed
                    isRemove = (arr[0]==='@__url');
                }
            }
            const fn = tags[keys[1]];
            if (fn && !isRemove) {
                console.log('>>>>>',arr[0]);
                isRemove = !fn(global.vars, arr[1]);
            }
            if (isRemove) {
                event.tags = [];
                event.name = '';
                event.steps = [];
            }
        }
    })
    // variable parser
    event.steps.forEach(step => {
        const varNames = step.name.match(/\${([A-z.]+)}/g);
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
