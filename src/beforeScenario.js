function url(partial) {
    const url = browser.execute(() => location.href).value;
    return !!url.match(partial);
}

function nonUrl(partial) {
    return !url(partial);
}

function waitUrl(partial) {
    const msg = `expected ${partial} is part of current url after 5s`;
    browser.waitUntil(() => url(partial), 5000, msg);
}

const ftags = {
    '@__url': url,
    '@__non_url': nonUrl,
    '@__waitUrl': waitUrl
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
