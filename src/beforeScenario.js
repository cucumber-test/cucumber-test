function url(partial) {
    const url = browser.execute(() => location.href).value;
    return !!url.match(partial);
}

function nonUrl(partial) {
    return !url(partial);
}

function waitForUrl(partial) {
    const msg = `expected ${partial} is part of current url after 5s`;
    return browser.waitUntil(() => url(partial), 5000, msg);
}

function slc(string) {
    if (string.match(/^\/\//)) {
        string = string.replace(/(\[)(\w+=)/g,'$1@$2');
    }
    var value = $$(string);
    console.log('>>>value', value);
    return value.length > 0;
}

const ftags = {
    '@__$': slc,
    '@__url': url,
    '@__non_url': nonUrl,
    '@__waitForUrl': waitForUrl
}

module.exports = event => {
    const {tags, vars} = global;
    let isRemove = false;

    for (let tag of event.tags) {
        const arr = tag.name.split(':');
        const fn = tags[arr[0]];
        const ft = ftags[arr[0]];

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
