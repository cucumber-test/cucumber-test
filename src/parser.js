const browserTags = [
    '@__chrome',
    '@__safari',
    '@__firefox',
    '@__microsoftedge',
    '@__internetexplorer'
];
const nonBrowserTags = [
    '@__non_chrome',
    '@__non_safari',
    '@__non_firefox',
    '@__non_microsoftedge',
    '@__non_internetexplorer'
];
const mobileTags = [
    '@__android',
    '@__mobile',
    '@__ios'
];
const nonMobileTags = [
    '@__non_android',
    '@__non_mobile',
    '@__non_ios'
];

function browserName() {
    const {browserName} = global.browser.desiredCapabilities;
    return browserName.toLowerCase().replace(/ /g,'');
}

function isBrowserTag(tagName) {
    const browserId = browserName();
    const arr = tagName.split('||');
    if (browserTags.indexOf(arr[0])>-1) {
        if (arr[0]===`@__${browserId}`) {
            return 1;
        } else if (arr.length>1){
            return isMobileTag(`@__${arr[1]}`)
        } else {
            return 0;
        }
    }
    if (nonBrowserTags.indexOf(arr[0])>-1) {
        return arr[0]===`@__non_${browserId}` ? 0 : 1;
    }
    return 1;
}

function isMobileTag(tagName) {
    const chkMobiles = {
        '@__android': global.browser.isAndroid,
        '@__mobile': global.browser.isMobile,
        '@__ios': global.browser.isIOS
    }
    const chkNonMobiles = {
        '@__non_android': !global.browser.isAndroid,
        '@__non_mobile': !global.browser.isMobile,
        '@__non_ios': !global.browser.isIOS
    }
    if (mobileTags.indexOf(tagName)>-1) {
        return chkMobiles[tagName] ? 1 : 0;
    }
    if (nonMobileTags.indexOf(tagName)>-1) {
        return chkNonMobiles[tagName] ? 1 : 0;
    }
    return 1;
}

module.exports = event => {
    const {vars} = global.browser.options;

    console.log('>>>>>',`@__${browserName()}`);
    event.scenarios = event.scenarios.filter(x=>{

        // share feature
        const fname = x.name.trim();
        if (fname[0]===':') {
            global.shareGherkinFeature.children.forEach(gScenario => {
                if (fname===`:${gScenario.name}`) {
                    x.steps = gScenario.steps.map(gk => {
                        const {uri, line, scenario, isBackground} =  x.steps[0];
                        return {
                            uri,
                            line,
                            scenario,
                            isBackground,
                            arguments: [],
                            name: gk.text,
                            keyword: gk.keyword,
                            keywordType: gk.type
                        }
                    });
                }
            })
        }

        // variable parser
        x.steps.forEach(obj => {
            const varNames = obj.name.match(/\${([A-z.]+)}/g);
            if (varNames) {
                varNames.forEach(varName=> {
                    let items = vars;
                    varName.replace(/[${}]/g,'').trim().split('.').forEach(i => {
                        if (items!==undefined)
                            items = items[i];
                    })
                    if (items!==undefined) {
                        obj.name = obj.name.replace(varName, items);
                    }
                })
            }
        })
        if (x.tags.length>0) {
            const isBrowserTags = x.tags.map(y => isBrowserTag(y.name)).sort();
            const isMobileTags = x.tags.map(y => isMobileTag(y.name)).sort();
            return (isBrowserTags[0] + isMobileTags[0])===2;
        }
        return true;
    });
}
