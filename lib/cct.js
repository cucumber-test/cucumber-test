'use strict';

var program = require('commander');

var _require = require('webdriverio'),
    Launcher = _require.Launcher,
    remote = _require.remote;

console.log('Loading...');

program.version('1.0.13');
program.on('-h, --help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ custom-help --help');
    console.log('    $ custom-help -h');
    console.log('');
});
program.option('-t, --tags [tags]', 'Run Featurs filtered by tags');
program.option('-s, --souce', 'Run in Souce labs cloud service');
program.option('-i, --instances [instances]', 'Max Instances');
program.option('-b, --browser [browser]', 'Target Browser');
program.option('--iphone', 'Chrome simulate iPhone');
program.option('--android [android]', 'Android');

program.parse(process.argv);

var tagExpression = program.tags || '@simple';

console.log('Tags:', tagExpression);

var options = {
    cucumberOpts: {
        tagExpression: tagExpression
    }
};

var browser = 'chrome';
options.maxInstances = +(program.instances || 1);
if (program.android) {
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
    options.capabilities = browser.split(',').map(function (x) {
        var bconfig = {
            maxInstances: 5,
            browserName: x
        };
        if (x === 'chrome' && program.iphone) {
            bconfig.chromeOptions = {
                args: ['use-mobile-user-agent', 'user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3']
            };
        }
        return bconfig;
    });
}

console.log('Browser:', browser, program.iphone ? '--iphone' : '', program.android ? '--android' : '');

if (program.souce) {
    options.sauceConnect = true;
    options.user = process.env.SAUCE_USERNAME;
    options.key = process.env.SAUCE_ACCESS_KEY;
    console.log('Run from Sauce Labs Cloud');
}

var wdio = new Launcher(__dirname + '/../wdio.conf.js', options);

wdio.run().then(function (code) {
    process.exit(code);
}, function (error) {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});