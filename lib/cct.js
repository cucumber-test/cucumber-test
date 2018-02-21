'use strict';

var url = require('url');
var program = require('commander');

var _require = require('webdriverio'),
    Launcher = _require.Launcher,
    remote = _require.remote;

program.version('1.0.29');
program.option('-r, --remote [host]', 'Remote server url [http://ex.com:4444]');
program.option('-t, --tags [tags]', 'Run Features filtered by tags');
program.option('-i, --instances [instances]', 'Max Instances');
program.option('-b, --browser [browser]', 'Target Browser');
program.option('-c, --cloud [provider]', 'Cloude saucelabs:connect');
program.option('--browserConfig [fpath]', 'Browser config [file/path.js]');
program.option('--retry [retry]', 'Connection retry [3]');
program.option('--timeout [timeout]', 'Timeout [20000]');
program.option('--android [android]', 'Run on android device');
program.option('--uaIphone', 'Chrome w/ user agent of iPhone');
program.option('--uaGalaxy', 'Chrome w/ user agent of Samsung Galaxy');

program.parse(process.argv);
console.log('Loading...');

var timeout = program.timeout || 20000;
var connectionRetryCount = program.retry || 3;
var _originalTags = (program.tags || '@simple') + ' and (not @Pending)';

var options = {
    waitforTimeout: timeout - 10000,
    connectionRetryCount: connectionRetryCount,
    cucumberOpts: {
        _originalTags: _originalTags,
        timeout: timeout
    }
};

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
    options.services = ['appium'];
    options.capabilities = [{
        appiumVersion: '1.7.2', // Appium module version
        browserName: browser, // browser name is empty for native apps
        platformName: 'Android',
        platformVersion: android[1] || '7.0', // Android platform version of the device
        deviceName: android[0], // device name of the mobile device
        newCommandTimeout: 30 * 60000,
        waitforTimeout: 10000,
        commandTimeout: 7200
        // app: './app/LGCalculator.apk',          // Path to the native app
        // appPackage: 'com.android.calculator2',  // Package name of the app
        // appActivity: 'com.android.calculator2.Calculator', // App activity of the app
    }];
} else {
    browser = program.browser || 'chrome';
    options.services = ['selenium-standalone', 'sauce']; // 'firefox-profile'
    options.capabilities = browser.split(',').map(function (browserIds) {
        var browserCfg = browserIds.split(':');
        var browserName = browserCfg[0];
        var bconfig = {
            acceptInsecureCerts: true,
            maxInstances: 5,
            browserName: browserName
        };
        if (browserCfg[1]) {
            bconfig.browserVersion = browserCfg[1];
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
                // technologyPreview: true,
            };
        }
        return bconfig;
    });
}

if (program.browserConfig) {
    var browserConfig = require(process.cwd() + '/' + program.browserConfig);
    Object.keys(browserConfig).forEach(function (browserId) {
        var idx = options.capabilities.findIndex(function (x) {
            return x.browserName === browserId;
        });
        if (idx !== -1) {
            options.capabilities[idx] = Object.assign(options.capabilities[idx], browserConfig[browserId]);
        } else {
            options.capabilities.push(browserConfig[browserId]);
        }
    });
}

console.log('Browser:', browser, program.uaIphone ? '--uaIphone' : '', program.uaGalaxy ? '--uaGalaxy' : '', program.android ? '--android' : '');

var tagExpression = _originalTags;
options.cucumberOpts.tagExpression = tagExpression;
console.log('Tags:', tagExpression);

if (program.cloud) {
    console.log('Run from ', program.cloud);
    var provider = program.cloud.split(':');
    if (provider[0] === 'saucelabs') {
        if (provider[1] === 'connect') {
            options.sauceConnect = true;
        }
        options.user = process.env.SAUCE_USERNAME;
        options.key = process.env.SAUCE_ACCESS_KEY;
    }
}

var wdio = new Launcher(__dirname + '/../wdio.conf.js', options);

wdio.run().then(function (code) {
    process.exit(code);
}, function (error) {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});