function url(partial) {
    const url = browser.execute(() => location.href).value;
    return !!url.match(partial);
}

function nonUrl(partial) {
    return !url(partial);
}

function waitForUrl(partial) {
    const arr = partial.split('|');
    const timeout = +(arr[1] || 2000);
    const {screenshotPath} = browser.options;
    try {
        browser.options.screenshotPath = null;
        const result = browser.waitUntil(() => url(arr[0]), timeout);
        browser.options.screenshotPath = screenshotPath;
        return result;
    } catch(e) {
        browser.options.screenshotPath = screenshotPath;
        return false;
    }
}

function main_url(browser, vars, string) {
    return (browser.getUrl().match(string) !== null);
}

function non_main_url(browser, vars, string) {
    return (browser.getUrl().match(string) === null);
}

function slc(string) {
    if (string.match(/^\/\//)) {
        string = string.replace(/(\[)(\w+=)/g,'$1@$2');
    }
    return browser.isExisting(string);
}

function getCookie(string) {
    const names = [], cookies = {};
    string.split(/, */).forEach(x => {
        const kv = x.split('=');
        if (kv.length > 1) {
            names.push(kv[0]);
            cookies[kv[0]] = kv[1];
        }
    });

    const cookielist = browser.execute(() => document.cookie).value;
    // console.log('cookies', cookielist, cookies);
    function getCookie(name) {
        var v = cookielist.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    for (var name of names) {
        if (cookies[name]!==getCookie(name)) {
            return false;
        }
    }
    return true;
}

function debug(browser, vars, string) {
    browser.debug();
    return true;
}

const ftags = {
    '@__$': slc,
    '@__url': url,
    '@__mainUrl': main_url,
    '@__cookies': getCookie,
    '@__waitForUrl': waitForUrl,
    '@__debug': debug,
    '@__non_url': nonUrl,
    '@__non_mainUrl': non_main_url
}

module.exports = event => {
    const {tags, vars} = global;
    const rgtags = /(^@__[_\w|\$]+):(.+)/;
    let isRemove = false;

    for (let tag of event.tags) {
        const mc = tag.name.match(rgtags);
        const kv = mc ? mc.splice(1,2) : tag.name.split(':');
        const fn = tags[kv[0]];
        const ft = ftags[kv[0]];

        if (ft) {
            isRemove = !ft(kv[1]);
        }

        if (!isRemove && fn) {
            isRemove = !fn(browser, global.vars, kv[1]);
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
