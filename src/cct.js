
const url = require('url');
const program = require('commander');
const { Launcher, remote } = require('webdriverio');

program.version('1.0.26');
program.option('-r, --remote [host]', 'Remote server url [http://ex.com:4444]');
program.option('-t, --tags [tags]', 'Run Features filtered by tags');
program.option('-s, --sauce', 'Run in Saucelabs cloud service');
program.option('-i, --instances [instances]', 'Max Instances');
program.option('-b, --browser [browser]', 'Target Browser');
program.option('--browserConfig [fpath]', 'Browser config [file/path.js]');
program.option('--retry [retry]', 'Connection retry [3]');
program.option('--timeout [timeout]', 'Timeout [20000]');
program.option('--android [android]', 'Run on android device');
program.option('--uaIphone', 'Chrome w/ user agent of iPhone');
program.option('--uaGalaxy', 'Chrome w/ user agent of Samsung Galaxy');

program.parse(process.argv);
console.log('Loading...');

const timeout = program.timeout || 20000;
const connectionRetryCount = program.retry || 3;
const _originalTags = (program.tags || '@simple') + ' and (not @Pending)';

const options = {
    waitforTimeout: timeout - 10000,
    connectionRetryCount,
    cucumberOpts: {
        _originalTags,
        timeout
    }
};

if (program.remote) {
    const myURL = url.parse(program.remote);
    console.log('Remote:', program.remote);
    options.protocol = myURL.protocol.replace(':', '') || 'http';
    options.port = myURL.port || 4444;
    options.host = myURL.hostname;
}

let browser = 'chrome';
options.maxInstances = +(program.instances || 1);
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
    options.services = ['appium'];
    options.capabilities = [{
        appiumVersion: '1.7.2',                    // Appium module version
        browserName: browser,                      // browser name is empty for native apps
        platformName: 'Android',
        platformVersion: android[1] || '7.0',      // Android platform version of the device
        deviceName: android[0],                    // device name of the mobile device
        newCommandTimeout: 30 * 60000,
        waitforTimeout: 10000,
        commandTimeout: 7200,
        // app: './app/LGCalculator.apk',          // Path to the native app
        // appPackage: 'com.android.calculator2',  // Package name of the app
        // appActivity: 'com.android.calculator2.Calculator', // App activity of the app
    }];
} else {
    browser = program.browser || 'chrome';
    options.services = ['selenium-standalone', 'sauce'];  // 'firefox-profile'
    options.capabilities = browser.split(',').map(x => {
        const bconfig = {
            maxInstances: 5,
            browserName: x
        };
        if (x === 'chrome') {
        	// bconfig.proxy = {
            //     proxyType: 'MANUAL',
            //     httpProxy: 'domain:80',
            //     sslProxy: 'domain:443'
            // };
        	const args = ['disable-web-security'];
	        bconfig.chromeOptions = {args}
            if (program.uaIphone) {
                args.push('use-mobile-user-agent', 'user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3')
            } else if (program.uaGalaxy) {
                args.push('use-mobile-user-agent', 'Mozilla/5.0 (Linux; Android 7.0;SAMSUNG SM-G955F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.2 Chrome/51.0.2704.106 Mobile Safari/537.36')
            }
        }
        if (x==='safari') {
            bconfig['safari.options'] = {
                // technologyPreview: true,
            }
        }
        return bconfig;
    });
}

if (program.browserConfig) {
    const browserConfig = require(process.cwd()+'/'+program.browserConfig);
    Object.keys(browserConfig).forEach((browserId) => {
        const idx = options.capabilities.findIndex(x => x.browserName===browserId);
        if (idx!==-1) {
            options.capabilities[idx] = Object.assign(options.capabilities[idx],browserConfig[browserId]);
        } else {
            options.capabilities.push(browserConfig[browserId])
        }
    })
}

console.log('Browser:', browser,
program.uaIphone ? '--uaIphone' : '',
program.uaGalaxy ? '--uaGalaxy' : '',
program.android  ? '--android' : '',
);

// const browserTag = `@__${browser}`;
// let browserTags = [
//     '@__firefox',
//     '@__chrome',
//     '@__safari',
//     '@__edge',
//     '@__ie'
// ].filter(x=> x!==browserTag).join(' or ');
// const tagExpression = `${_originalTags} and not (${browserTags})`;
const tagExpression = _originalTags;
options.cucumberOpts.tagExpression = tagExpression;
console.log('Tags:', tagExpression);

if (program.souce) {
    options.sauceConnect = true;
    options.user = process.env.SAUCE_USERNAME;
    options.key = process.env.SAUCE_ACCESS_KEY;
    console.log('Run from Saucelabs cloud service');
}

const wdio = new Launcher(`${__dirname}/../wdio.conf.js`, options);

wdio.run().then(
    code => {
        process.exit(code);
    },
    error => {
        console.error('Launcher failed to start the test', error.stacktrace);
        process.exit(1);
    }
);
