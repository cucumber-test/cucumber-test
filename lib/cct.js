'use strict';

const fs = require('fs');
const url = require('url');
const faker = require('faker');
const Chance = require('chance');
const request = require('request');
const webdriverio = require('webdriverio');
const { Launcher } = require('webdriverio');
const _merge = require('lodash/merge');
const program = require('./program')();
const compiler = require('./compiler');
const chance = new Chance();

const cpath = program.config;
const config = require(cpath)({ webdriverio, faker, chance, request });

/*
 * params: -t , default tags
 */
let options = { services: [] }; // services: ['firefox-profile'],
let _originalTags = 'not @Pending';
if (program.tags) {
    _originalTags = `${program.tags} and (not @Pending)`;
}

/*
 * params: -f , filter folder to be run
 */
let specs = ['./features/**/*.feature'];
if (program.features) {
    program.dev && compiler.feature(program.features);
    specs = [`./features/${program.features}/**/*.feature`];
}

/*
 * params: -s , filter script files to be execute
 */
if (program.specs) {
    const path = specs[0].replace('/**/*.feature', '');
    const files = compiler.traverseFileSystem(path);
    specs = files.filter(file => {
        return file.match(program.specs);
    });
}
console.log('Specs:', specs);

const base = config.base || {};
let browsers = config.browsers || {};
let remoteConfig = {};

let browser = base.browser || 'chrome';
let timeout = base.timeout || 20000;
let retry = base.retry || 3;

/*
 * params: -r , prepare config for remote selenium server
 */
if (program.remote) {
    remoteConfig = config.remote || {};
}

let provider;
console.log('Loading...');

/*
 * params: -c , prepare for cloud services
 */
if (program.cloud) {
    let cloud = base.cloud;
    if (program.cloud === true) {
        if (typeof base.cloud !== 'string') {
            console.log(`option --cloud need to have params or config.js {base: {cloud:'cloudprovider'}} set`);
            process.exit(1);
        }
    } else {
        cloud = program.cloud;
    }
    const clouds = cloud.split(':');
    provider = clouds[0];

    console.log(`Run from ${cloud}`);
    const auth_name = `${provider.toUpperCase()}_USERNAME`;
    const auth_key = `${provider.toUpperCase()}_ACCESS_KEY`;
    if (config[provider] && config[provider][auth_name]) {
        options.user = config[provider][auth_name];
    } else {
        options.user = process.env[auth_name];
    }
    if (config[provider] && config[provider][auth_key]) {
        options.key = config[provider][auth_key];
    } else {
        options.key = process.env[auth_key];
    }
    if (provider === 'saucelabs') {
        options.services.push('sauce');
        if (clouds[1] === 'connect') {
            options.sauceConnect = true;
        }
        if (config.saucelabs.SAUCELABS_TESTOBJECT) {
            options.testobject_api_key = config.saucelabs.SAUCELABS_TESTOBJECT;
        } else if (process.env.SAUCELABS_TESTOBJECT) {
            options.testobject_api_key = process.env.SAUCELABS_TESTOBJECT;
        }
        if (options.testobject_api_key) {
            options.protocol = 'https';
            options.host = 'us1.appium.testobject.com';
            options.path = '/wd/hub';
            options.port = '443';
        }
    } else if (provider === 'browserstack') {
        options.services.push('browserstack');
        options.browserstackLocal = true;
    } else if (provider === 'crossbrowsertesting') {
        options.host = 'hub.crossbrowsertesting.com';
        options.port = 80;
        options.crossbrowsertestingLocal = true;
    } else if (provider === 'testingbot') {
        options.host = 'hub.testingbot.com';
        options.port = 80;
    }
    if (options.user && options.key) {
        if (config[provider]) {
            remoteConfig = _merge(remoteConfig, config[provider]);;
        }
    } else {
        console.log(`option --cloud need to have env of user & key of the cloud set`);
        process.exit(1);
    }
}

if (typeof program.remote === 'string') {
    remoteConfig.remote = program.remote;
}

if (remoteConfig.remote) {
    console.log('Remote>>>:', remoteConfig.remote);
    const myURL = url.parse(remoteConfig.remote);
    options.protocol = myURL.protocol.replace(':', '') || 'http';
    options.port = myURL.port || 4444;
    options.host = myURL.hostname;
}

if (remoteConfig.browsers) {
    browsers = _merge(browsers, remoteConfig.browsers);
}

if (remoteConfig.browser) {
    browser = remoteConfig.browser;
}

if (remoteConfig.timeout) {
    timeout = remoteConfig.timeout;
}

if (remoteConfig.retry) {
    retry = remoteConfig.retry;
}

/*
 * params: -b , prepare config for browser
 */
if (program.browser) {
    browser = program.browser;
}

if (program.timeout) {
    timeout = program.timeout;
}

if (program.retry) {
    retry = program.retry;
}

/*
 * params: -n , prepare config for name
 */
if (typeof program.name === 'string') {
    base.name = program.name;
}

let browserIds = browser.split(',');
if (!base.instances) {
    base.instances = browserIds.length;
}

/*
 * params: -i , prepare config for instances
 */
if (program.instances) {
    base.instances = program.instances;
}

options = _merge(options, {
    connectionRetryCount: retry,
    waitforTimeout: timeout - 10000,
    // firefoxProfile: {"security.tls.version.max": 1},
    maxInstances: base.instances,
    cucumberOpts: {
        _originalTags,
        timeout
    },
    vars: {},
    specs,
    cpath,
    base
});
console.log('Timeout/Retry/I:', `${timeout}/${retry}/${base.instances}`);

/*
 * params: --android , prepare config for android
 */
if (program.android) {
    if (program.android === true) {
        if (base.android) {
            program.android = base.android;
        } else {
            console.log(`
deviceName & platformVersion are required!
cct --android [deviceName:platformVersion]
            `);
            process.exit(0);
        }
    }
    const android = program.android.split(':');
    browser = 'chrome';
    options.port = '4723';
    options.services.push('appium');
    options.maxInstances = 1;
    options.capabilities = [{
        name: base.name,
        browserName: browser, // browser name is empty for native apps
        appiumVersion: '1.8.1', // Appium module version
        // https://github.com/appium/appium/issues/8651
        platformName: 'Android',
        platformVersion: android[1] || '7.0', // Android version
        deviceName: android[0], // device name of the mobile device
        newCommandTimeout: 30 * 60000,
        waitforTimeout: 10000,
        commandTimeout: 7200
    }];
} else {
    if (browser.match(/\:[a-zA-Z]+\d+/) && program.config === undefined) {
        console.log(`Browser: ${browser} need to have option --config`);
        process.exit(1);
    }
    options.services.push('selenium-standalone'); // 'firefox-profile'
    options.capabilities = browserIds.map(bName => {
        const browserCfg = bName.split(':');
        const browserName = browserCfg[0];
        const bconfig = {
            name: base.name,
            maxInstances: 5,
            browserName,
            acceptInsecureCerts: true
        };
        if (browserCfg[1]) {
            bconfig._ext = browserCfg[1];
        };
        if (browserName === 'chrome') {
            const args = ['disable-web-security'];
            bconfig.chromeOptions = { args };
            if (program.uaIphone) {
                args.push('use-mobile-user-agent', 'user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3');
            } else if (program.uaGalaxy) {
                args.push('use-mobile-user-agent', 'Mozilla/5.0 (Linux; Android 7.0;SAMSUNG SM-G955F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.2 Chrome/51.0.2704.106 Mobile Safari/537.36');
            }
        }
        if (provider === 'saucelabs' && remoteConfig.parentTunnel) {
            bconfig.parentTunnel = remoteConfig.parentTunnel;
        }
        return bconfig;
    });
}

console.log('Browser:', browser, program.uaIphone ? '--uaIphone' : '', program.uaGalaxy ? '--uaGalaxy' : '', program.android ? '--android' : '');

/*
 * setting browser capabilities
 */
if (program.config) {
    options.capabilities.forEach((obj, idx) => {
        const name = obj.browserName,
              _ext = obj._ext;
        const baseCfg = browsers[name] || {};
        let capability = null;
        if (browsers[`${name}:${_ext}`]) {
            options.capabilities[idx] = Object.assign({}, options.capabilities[idx], baseCfg, browsers[`${name}:${_ext}`]);
            delete options.capabilities[idx]._ext;
            capability = options.capabilities[idx];
        } else if (browsers[name]) {
            options.capabilities[idx] = Object.assign({}, options.capabilities[idx], baseCfg);
            capability = options.capabilities[idx];
        }
        if (capability) {
            if (provider === 'browserstack' && capability.build) {
                capability['real_mobile'] = true;
                capability['browserstack.debug'] = true;
                capability['browserstack.user'] = options.user;
                capability['browserstack.key'] = options.key;
            } else if (provider === 'testingbot' && capability.platformName && capability.platformName.match(/iOS|Android/)) {
                capability['client_key'] = options.user;
                capability['client_secret'] = options.key;
            } else if (provider === 'saucelabs' && options.testobject_api_key) {
                capability.testobject_api_key = options.testobject_api_key;
            }
            console.log(capability);
        }
    });
}

/*
 * params: --vars , prepare config for vars
 */
if (program.vars) {
    const paramVars = JSON.parse(program.vars);
    options.vars = _merge(options.vars, paramVars);
}

const tagExpression = _originalTags;
options.cucumberOpts.tagExpression = tagExpression;
console.log('Tags:', tagExpression);

const wdio = new Launcher(`${__dirname}/../wdio.conf.js`, options);
console.timeEnd("Prepare");
console.log('start...');
try {
    console.time("Run");
    wdio.run().then(code => {
        console.timeEnd("Run");
        console.log('Normal exit:', code);
        process.exit(code);
    }, error => {
        console.timeEnd("Run");
        console.error('Launcher failed to start the test', error.stacktrace);
        process.exit(1);
    });
} catch (e) {
    console.timeEnd("Run");
    console.log('Ultimate error catch:', e);
    process.exit(1);
}