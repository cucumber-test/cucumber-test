module.exports = (ob) => {
    return {
        browsers: {
            safari:  { build: 'Desktop' },
            chrome:  { build: 'Desktop', version: '67' },
            firefox: { build: 'Desktop', version: '61' },
            edge:    { build: 'Desktop', browserName: 'microsoftedge' },
            ie:      { build: 'Desktop', browserName: 'internet explorer' },
            'safari:tp':  { 'safari.options': { technologyPreview: true }},
            'safari:dx':  { proxy: { proxyType: 'DIRECT' }},
            'chrome:dx':  { proxy: { proxyType: 'DIRECT' }},
            'firefox:dx': { proxy: { proxyType: 'DIRECT' }},
            'edge:ex':    { unhandledPromptBehavior: 'accept' },
            'ie:11':      { version: '11' }
        },
        saucelabs: {
            browsers: {
                safari:  { platform: 'OS X 10.11' },
                chrome:  { platform: 'WIN10' },
                firefox: { platform: 'WIN10' },
                edge:    { platform: 'WIN10' },
                ie:      { platform: 'WIN10' },
                iphone8: { // simulator
                    appiumVersion: '1.8.1',
                    deviceName:"iPhone 8 Plus Simulator",
                    deviceOrientation: 'portrait',
                    platformName: 'iOS',
                    platformVersion: '11.2',
                    browserName: 'Safari',
                },
                android: { // simulator
                    appiumVersion: '1.8.1',
                    deviceName:"Android Emulator",
                    platformName: 'Android',
                    platformVersion: '6.0',
                    browserName: 'Chrome',
                },
                // nexus5: { // no real device account
                //     platformVersion: '7',
                //     platformName: 'Android',
                //     deviceName: 'LG Nexus 5X',
                //     browserName: 'Chrome',
                // },
            },
            // parentTunnel: 'username',
            browser: 'chrome',
            timeout: 50000,
            retry: 7,
            // SAUCELABS_USERNAME: 'your-username',
            // SAUCELABS_ACCESS_KEY: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            // SAUCELABS_TESTOBJECT: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        browserstack: { // platform: MAC, WIN8, XP, WINDOWS, and ANY
            browsers: {
                safari:  { platform: 'MAC',     version: '11' },
                chrome:  { platform: 'WINDOWS', version: '67' },
                firefox: { platform: 'WINDOWS', version: '61' },
                edge:    { platform: 'WINDOWS', version: '17' },
                ie:      { platform: 'WINDOWS', version: '11' },
                iphone7: {
                    build: 'Node IOS',
                    device: 'iPhone 7',
                    os_version: '10.3',
                },
                iphone8: {
                    build: 'Node IOS',
                    device: 'iPhone 8',
                    os_version: '11.0',
                },
                iphonex: {
                    build: 'Node IOS',
                    device: 'iPhone X',
                    os_version: '11.0',
                },
                samsung8: {
                    build: 'Node Android',
                    device: 'Samsung Galaxy S8',
                    os_version: '7.0',
                },
                samsung9: {
                    build: 'Node Android',
                    device: 'Samsung Galaxy S9',
                    os_version: '8.0',
                }
            },
            browser: 'edge',
            timeout: 50000,
            retry: 7
            // BROWSERSTACK_USERNAME: 'your-username',
            // BROWSERSTACK_ACCESS_KEY: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        testingbot: {
            browsers: {
                safari:  { platform: 'MAC',   version: '11' },
                chrome:  { platform: 'WIN10', version: '67' },
                firefox: { platform: 'WIN10', version: '61' },
                edge:    { platform: 'WIN10', version: '16' },
                ie:      { platform: 'WIN10', version: '11' },
                iphone8: { // simulator is not working
                    browserName: 'Safari',
                    version: '11.4',
                    platform: 'iOS',
                    platformName: 'iOS',
                    deviceName: 'iPhone 8',
                },
                pixelc: { // simulator is not working
                    browserName: 'Chrome',
                    version: '7.1',
                    platform: 'Android',
                    platformName: 'Android',
                    deviceName: 'Pixel C',
                },
            },
            browser: 'chrome',
            timeout: 50000,
            retry: 7,
            // TESTINGBOT_USERNAME: 'your-username',
            // TESTINGBOT_ACCESS_KEY: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        crossbrowsertesting: {
            browsers: {
                safari:  { platform: 'Mac OSX 10.12', version: '10' },
                chrome:  { platform: 'WIN7',  version: '67' },
                firefox: { platform: 'WIN10', version: '61' },
                edge:    { platform: 'WIN10', version: '17' },
                ie:      { platform: 'WIN10', version: '11' },
                iphone8: {
                    build: 'Node IOS',
                    browserName: 'Safari',
                    deviceName: 'iPhone 8 Simulator',
                    platformVersion: '11.0',
                    platformName: 'iOS'
                },
                nexus9: {
                    build: 'Node Android',
                    browserName: 'Chrome',
                    deviceName: 'Nexus 9',
                    platformVersion: '6.0',
                    platformName: 'Android'
                },
            },
            browser: 'chrome',
            timeout: 50000,
            retry: 7,
            // CROSSBROWSERTESTING_USERNAME: 'your-username',
            // CROSSBROWSERTESTING_ACCESS_KEY: 'xxxxxxxxxxxxxxxx',
        },
        perfecto: {
            browsers: {
                android: {
                    deviceName: '5LM0216201003470',
                    // user: 'user@perfecto.com',
                    // password: 'password'
                },
            },
            host: 'myHost.perfectomobile.com',
            browser: 'android',
            timeout: 50000,
            retry: 7,
        },
        remote: {
            remote: 'http://localhost:4444',
            browser: 'firefox,chrome',
            timeout: 40000,
            retry: 6
        },
        base: {
            name: 'CCT',
            cloud: 'saucelabs',
            android: 'f344ee26:8.0',
            browser: 'chrome',
            inputPause: 500,
            timeout: 20000,
            instances: 1,
            retry: 3
        },
        tags: {
            "@__test": function(browser, vars, string) {
                vars.g.search = `cucumber-io`;
                // console.log(vars.g, string);
                return true;
            },
            "@__wd": function(browser, vars, string) {
                var result = browser.chromeClient(function(client, resolved, reject) {
                    client
                    .init()
                    .url('https://duckduckgo.com/')
                    .setValue('#search_form_input_homepage', 'WebdriverIO')
                    .click('#search_button_homepage')
                    .getTitle()
                    .then(function(title) {
                        resolved(title);
                    })
                    .end();
                });
                console.log('Title is: ' + result);
                vars.g.search = result;
                return true;
            }
        },
        vars: {
            g: {
                q: '[name=q]',
                btnG: 'input.lsb',
                btnM: 'button._S6q',
                search: 'cucumber io',
                url: 'https://google.com',
                btnI: `button[aria-label='Google Search']`,
                cucumberIo: "a[href='https://cucumber.io/']",
                email: ob.chance.email()
            }
        }
    }
}
