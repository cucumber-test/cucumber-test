
const fs = require('fs');
const url = require('url');
const program = require('commander');
const { Launcher, remote } = require('webdriverio');
const _merge = require('lodash/merge');

program.version('1.0.38');
program.option('-f, --features [path]', 'location of features/[path]');
program.option('-t, --tags [tags]', 'run features filtered by tags');
program.option('-r, --remote [host]', 'remote server [http://ex.com:4444]');
program.option('-c, --cloud [provider]', 'cloud [saucelabs] or [browserstack]');
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

const timeout = program.timeout || 20000;
const connectionRetryCount = program.retry || 3;

let _originalTags = 'not @Pending';
if (program.tags) {
    _originalTags = `${program.tags} and (not @Pending)`;
}

let specs = ['./features/**/*.feature'];
if (program.features) {
    specs = [`./features/${program.features}/**/*.feature`];
}

const options = {
    waitforTimeout: timeout - 10000,
    connectionRetryCount,
    services: [],
    cucumberOpts: {
        _originalTags,
        timeout
    },
    specs
};

if (program.config===undefined && fs.existsSync(process.cwd()+'/config.js')) {
    program.config = 'config.js';
}

if (program.remote) {
    const myURL = url.parse(program.remote);
    console.log('Remote:', program.remote);
    options.protocol = myURL.protocol.replace(':', '') || 'http';
    options.port = myURL.port || 4444;
    options.host = myURL.hostname;
}

let browser = program.browser || 'chrome';
let browserIds = browser.split(',');
options.maxInstances = +(program.instances || browserIds.length);
if (program.android) {
    if (program.android===true) {
        console.log(`
deviceName & platformVersion are required!
cct --android [deviceName:platformVersion]
        `);
        process.exit(0);
    }
    const android = program.android.split(':');
    options.port = '4723';
    options.services.push('appium');
    options.capabilities = [{
        browserName: 'chrome',                 // browser name is empty for native apps
        appiumVersion: '1.7.2',                // Appium module version
        // https://github.com/appium/appium/issues/8651
        // browserName: browserIds[0].split(':')[0],
        platformName: 'Android',
        platformVersion: android[1] || '7.0',  // Android platform version of the device
        deviceName: android[0],                // device name of the mobile device
        newCommandTimeout: 30 * 60000,
        waitforTimeout: 10000,
        commandTimeout: 7200,
    }];
} else {
    if (browser.match(/\:[a-zA-Z]+\d+/) && program.config===undefined) {
        console.log(`Browser: ${browser} need to have option --config`);
        process.exit(0);
    }
    options.services.push('selenium-standalone');  // 'firefox-profile'
    options.capabilities = browserIds.map(bName => {
        const browserCfg = bName.split(':');
        const browserName = browserCfg[0];
        const bconfig = {
            acceptInsecureCerts: true,
            maxInstances: 5,
            browserName
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
    const config = require(process.cwd()+'/'+program.config)();
    const {browsers, vars} = config;

    options.vars = vars;
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
} else {
    options.vars = {};
}

if (program.vars) {
    const paramVars = JSON.parse(program.vars);
    options.vars = _merge(options.vars, paramVars);
}

const tagExpression = _originalTags;
options.cucumberOpts.tagExpression = tagExpression;
console.log('Tags:', tagExpression);

if (program.cloud) {
    console.log('Run from ', program.cloud);
    const provider = program.cloud.split(':');
    if (provider[0]==='saucelabs') {
        options.services.push('sauce');
        if (provider[1]==='connect') {
            options.sauceConnect = true;
        }
        options.user = process.env.SAUCE_USERNAME;
        options.key = process.env.SAUCE_ACCESS_KEY;
    } else if (provider[0]==='browserstack') {
        options.services.push('browserstack');
        options.user = process.env.BROWSERSTACK_USERNAME;
        options.key = process.env.BROWSERSTACK_ACCESS_KEY;
        options.browserstackLocal = true;
    }
}

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
