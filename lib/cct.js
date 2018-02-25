'use strict';

var fs = require('fs');
var url = require('url');
var program = require('commander');

var _require = require('webdriverio'),
    Launcher = _require.Launcher,
    remote = _require.remote;

program.version('1.0.35');
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

program.parse(process.argv);
console.log('Loading...');

var timeout = program.timeout || 20000;
var connectionRetryCount = program.retry || 3;

var _originalTags = 'not @Pending';
if (program.tags) {
    _originalTags = program.tags + ' and (not @Pending)';
}

var specs = ['./features/**/*.feature'];
if (program.features) {
    specs = ['./features/' + program.features + '/**/*.feature'];
}

var options = {
    waitforTimeout: timeout - 10000,
    connectionRetryCount: connectionRetryCount,
    services: [],
    cucumberOpts: {
        _originalTags: _originalTags,
        timeout: timeout
    },
    specs: specs
};

if (program.config === undefined && fs.existsSync(process.cwd() + '/config.js')) {
    program.config = 'config.js';
}

if (program.remote) {
    var myURL = url.parse(program.remote);
    console.log('Remote:', program.remote);
    options.protocol = myURL.protocol.replace(':', '') || 'http';
    options.port = myURL.port || 4444;
    options.host = myURL.hostname;
}

var browser = 'chrome';
options.maxInstances = +(program.instances || 1);
if (program.android) {
    if (program.android === true) {
        console.log('\ndeviceName & platformVersion are required!\ncct --android [deviceName:platformVersion]\n        ');
        process.exit(0);
    }
    var android = program.android.split(':');
    options.port = '4723';
    options.services.push('appium');
    options.capabilities = [{
        appiumVersion: '1.7.2', // Appium module version
        browserName: browser, // browser name is empty for native apps
        platformName: 'Android',
        platformVersion: android[1] || '7.0', // Android platform version of the device
        deviceName: android[0], // device name of the mobile device
        newCommandTimeout: 30 * 60000,
        waitforTimeout: 10000,
        commandTimeout: 7200
    }];
} else {
    browser = program.browser || 'chrome';
    if (browser.match(/\:[a-zA-Z]+\d+/) && program.config === undefined) {
        console.log('Browser: ' + browser + ' need to have option --config');
        process.exit(0);
    }
    options.services.push('selenium-standalone'); // 'firefox-profile'
    options.capabilities = browser.split(',').map(function (browserIds) {
        var browserCfg = browserIds.split(':');
        var browserName = browserCfg[0];
        var bconfig = {
            acceptInsecureCerts: true,
            maxInstances: 5,
            browserName: browserName
        };
        if (browserCfg[1]) {
            bconfig.version = browserCfg[1];
        };
        if (browserName === 'chrome') {
            var args = ['disable-web-security'];
            bconfig.chromeOptions = { args: args };
            if (program.uaIphone) {
                args.push('use-mobile-user-agent', 'user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3');
            } else if (program.uaGalaxy) {
                args.push('use-mobile-user-agent', 'Mozilla/5.0 (Linux; Android 7.0;SAMSUNG SM-G955F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.2 Chrome/51.0.2704.106 Mobile Safari/537.36');
            }
        }
        if (browserName === 'safari') {
            bconfig['safari.options'] = {
                technologyPreview: true
            };
        }
        return bconfig;
    });
}

console.log('Browser:', browser, program.uaIphone ? '--uaIphone' : '', program.uaGalaxy ? '--uaGalaxy' : '', program.android ? '--android' : '');

if (program.config) {
    var config = require(process.cwd() + '/' + program.config)();
    var browsers = config.browsers,
        vars = config.vars;


    options.vars = vars;
    options.capabilities.forEach(function (obj, idx) {
        var name = obj.browserName,
            version = obj.version;
        if (browsers[name + ':' + version]) {
            options.capabilities[idx] = browsers[name + ':' + version];
            console.log(options.capabilities[idx]);
        } else if (browsers[name]) {
            options.capabilities[idx] = browsers[name];
            console.log(options.capabilities[idx]);
        }
    });
}

var tagExpression = _originalTags;
options.cucumberOpts.tagExpression = tagExpression;
console.log('Tags:', tagExpression);

if (program.cloud) {
    console.log('Run from ', program.cloud);
    var provider = program.cloud.split(':');
    if (provider[0] === 'saucelabs') {
        options.services.push('sauce');
        if (provider[1] === 'connect') {
            options.sauceConnect = true;
        }
        options.user = process.env.SAUCE_USERNAME;
        options.key = process.env.SAUCE_ACCESS_KEY;
    } else if (provider[0] === 'browserstack') {
        options.services.push('browserstack');
        options.user = process.env.BROWSERSTACK_USERNAME;
        options.key = process.env.BROWSERSTACK_ACCESS_KEY;
        options.browserstackLocal = true;
    }
}

var wdio = new Launcher(__dirname + '/../wdio.conf.js', options);
console.log('start...');
try {
    wdio.run().then(function (code) {
        console.log('Normal exit:', code);
        process.exit(code);
    }, function (error) {
        console.error('Launcher failed to start the test', error.stacktrace);
        process.exit(1);
    });
} catch (e) {
    console.log('Ultimate error catch:', e);
    process.exit(1);
}