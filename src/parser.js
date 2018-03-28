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
    const newScenarios = [];
    const {vars} = global.browser.options;

    console.log('>>>>>',`@__${browserName()}`);
    event.scenarios.forEach((xObj, xId) => {
        // share feature
        const fname = xObj.name.trim();
        if (xObj.steps.length===1 && xObj.steps[0].name==='...') {
            global.shareGherkinFeature.children.forEach(gScenario => {
                if (fname===gScenario.name) {
                    let cloneObj = Object.assign({}, xObj);
                    // console.log('XXX>>>',xId,gScenario,xObj)
                    if (gScenario.tags.length>0) {
                        cloneObj.tags = gScenario.tags.map(tg => {
                            return {
                                line: 0,
                                name: tg.name
                            }
                        })
                    }
                    cloneObj.steps = gScenario.steps.map(gk => {
                        const {uri, line, scenario, isBackground} =  xObj.steps[0];
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
                    newScenarios.push(cloneObj);
                }
            })
        } else {
            newScenarios.push(xObj);
        }
    });

    event.scenarios = newScenarios.filter(xObj => {
        // variable parser
        xObj.steps.forEach(obj => {
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
        if (xObj.tags.length>0) {
            const isBrowserTags = xObj.tags.map(y => isBrowserTag(y.name)).sort();
            const isMobileTags = xObj.tags.map(y => isMobileTag(y.name)).sort();
            return (isBrowserTags[0] + isMobileTags[0])===2;
        }
        return true;
    });
}
