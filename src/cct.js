const fs = require('fs');
const url = require('url');
const faker = require('faker');
const program = require('commander');
const { Launcher, remote } = require('webdriverio');
const _merge = require('lodash/merge');

program.version('1.1.10');
program.option('-f, --features [path]', 'location of features/[path]');
program.option('-t, --tags [tags]', 'run features filtered by tags');
program.option('-r, --remote [host]', 'remote server [http://ex.com:4444]');
program.option('-c, --cloud [provider]', 'cloud [saucelabs, browserstack, perfecto]');
program.option('-i, --instances [instances]', 'max instances');
program.option('-b, --browser [browser]', 'target browser');
program.option('--timeout [timeout]', 'timeout [20000]');
program.option('--retry [retry]', 'connection retry [3]');
program.option('--config [fpath]', 'config [./config.js]');
program.option('--android [android]', 'run on android device');
program.option('--uaIphone', 'chrome w/ user agent of iPhone');
program.option('--uaGalaxy', 'chrome w/ user agent of Samsung Galaxy');
program.option('--vars [json]', `vars '{"g":{"search":"automation"}}'`);

program.parse(process.argv);
console.log('Loading...');

if (program.config===undefined && fs.existsSync(process.cwd()+'/config.js')) {
    program.config = 'config.js';
}

let config = {};
if (program.config) {
    config = require(process.cwd()+'/'+program.config)(faker);
}

let _originalTags = 'not @Pending';
if (program.tags) {
    _originalTags = `${program.tags} and (not @Pending)`;
}

let specs = ['./features/**/*.feature'];
if (program.features) {
    specs = [`./features/${program.features}/**/*.feature`];
}

let vars = config.vars || {};
let options = {services: []}; // services: ['firefox-profile'],
let general = config.general || {};
let browsers = config.browsers || {};
let remoteConfig = {};

let browser = general.browser || 'chrome';
let timeout = general.timeout || 20000;
let retry = general.retry || 3;

if (program.remote) {
    remoteConfig = config.remote || {};
    if (typeof(program.remote)==='string') {
        remoteConfig = {
            remote: program.remote
        };
    }
}

if (program.cloud) {
    console.log('Run from ', program.cloud);
    const clouds = program.cloud.split(':');
    const provider = clouds[0];
    if (provider==='saucelabs') {
        options.services.push('sauce');
        if (clouds[1]==='connect') {
            options.sauceConnect = true;
        }
        options.user = process.env.SAUCE_USERNAME;
        options.key = process.env.SAUCE_ACCESS_KEY;
    } else if (provider==='browserstack') {
        options.services.push('browserstack');
        options.user = process.env.BROWSERSTACK_USERNAME;
        options.key = process.env.BROWSERSTACK_ACCESS_KEY;
        options.browserstackLocal = true;
    }
    if (config[provider]) {
        remoteConfig = config[provider];
    }
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

if (program.browser) {
    browser = program.browser;
}

if (program.timeout) {
    timeout = program.timeout;
}

if (program.retry) {
    retry = program.retry;
}

options = _merge(options, {
    connectionRetryCount: retry,
    waitforTimeout: timeout - 10000,
    // firefoxProfile: {"security.tls.version.max": 1},
    cucumberOpts: {
        _originalTags,
        timeout
    },
    general,
    specs,
    vars
});
console.log('Timeout/Retry:', `${timeout}/${retry}`);

if (program.android) {
    if (program.android===true) {
        if (general.android) {
            program.android = general.android;
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
    options.capabilities = [{
        browserName: browser,  // browser name is empty for native apps
        appiumVersion: '1.7.2', // Appium module version
        // https://github.com/appium/appium/issues/8651
        platformName: 'Android',
        platformVersion: android[1] || '7.0',  // Android version
        deviceName: android[0], // device name of the mobile device
        newCommandTimeout: 30 * 60000,
        waitforTimeout: 10000,
        commandTimeout: 7200,
    }];
} else {
    if (browser.match(/\:[a-zA-Z]+\d+/) && program.config===undefined) {
        console.log(`Browser: ${browser} need to have option --config`);
        process.exit(0);
    }
    let browserIds = browser.split(',');
    options.services.push('selenium-standalone');  // 'firefox-profile'
    options.maxInstances = +(program.instances || browserIds.length);
    options.capabilities = browserIds.map(bName => {
        const name = general.logsTitle || 'CCT';
        const browserCfg = bName.split(':');
        const browserName = browserCfg[0];
        const bconfig = {
            name,
            maxInstances: 5,
            browserName,
            acceptInsecureCerts: true,
        };
        if (browserCfg[1]) {
            bconfig.version = browserCfg[1];
        };
        if (browserName === 'chrome') {
        	const args = ['disable-web-security'];
	        bconfig.chromeOptions = {args}
            if (program.uaIphone) {
                args.push('use-mobile-user-agent', 'user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3')
            } else if (program.uaGalaxy) {
                args.push('use-mobile-user-agent', 'Mozilla/5.0 (Linux; Android 7.0;SAMSUNG SM-G955F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.2 Chrome/51.0.2704.106 Mobile Safari/537.36')
            }
        }
        if (browserName==='safari') {
            bconfig['safari.options'] = {
                technologyPreview: true,
            }
        }
        return bconfig;
    });
}

console.log('Browser:', browser,
program.uaIphone ? '--uaIphone' : '',
program.uaGalaxy ? '--uaGalaxy' : '',
program.android  ? '--android' : '',
);

if (program.config) {
    options.capabilities.forEach((obj, idx) => {
        const name = obj.browserName, version = obj.version;
        if (browsers[`${name}:${version}`]) {
            options.capabilities[idx] = Object.assign({}, options.capabilities[idx], browsers[`${name}:${version}`]);
            console.log(options.capabilities[idx]);
        } else if (browsers[name]) {
            options.capabilities[idx] = Object.assign({}, options.capabilities[idx], browsers[name]);
            console.log(options.capabilities[idx]);
        }
    });
}

if (program.vars) {
    const paramVars = JSON.parse(program.vars);
    options.vars = _merge(options.vars, paramVars);
}

const tagExpression = _originalTags;
options.cucumberOpts.tagExpression = tagExpression;
console.log('Tags:', tagExpression);

const wdio = new Launcher(`${__dirname}/../wdio.conf.js`, options);
console.log('start...');
try {
    wdio.run().then(
        code => {
            console.log('Normal exit:', code);
            process.exit(code);
        },
        error => {
            console.error('Launcher failed to start the test', error.stacktrace);
            process.exit(1);
        }
    );
} catch(e) {
    console.log('Ultimate error catch:', e);
    process.exit(1);
}
