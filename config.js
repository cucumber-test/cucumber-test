module.exports = (ob) => {
    return {
        browsers: {
            chrome: {
                version: '67'
            },
            'chrome:dx': {
                proxy: {
                    proxyType: 'DIRECT'
                }
            },
            firefox: {
                version: '61'
            },
            'firefox:dx': {
                proxy: {
                    proxyType: 'DIRECT'
                }
            },
            safari: {
                platform: 'MAC'
            },
            'safari:dx': {
                proxy: {
                    proxyType: 'DIRECT'
                }
            },
            edge: {
                browserName: 'microsoftEdge',
                unhandledPromptBehavior: 'accept'
            },
            ie: {
                browserName: 'internet explorer',
                version: '11'
            }
        },
        saucelabs: {
            browsers: {
                chrome: {
                    platform: 'WIN7',
                    version: '65'
                },
                firefox: {
                    platform: 'WIN7',
                    version: '59'
                },
                "firefox:m52": {
                    platform: 'MAC',
                    version: '52'
                },
                safari: {
                    platform: 'macOS 10.12',
                    version: '10.1'
                },
                edge: {
                    platform: 'Windows 10',
                    version: '16'
                },
                ie: {
                    platform: 'WIN7'
                },
                ios: {
                    appiumVersion: '1.8.1',
                    deviceName:"iPhone 8 Plus Simulator",
                    deviceOrientation: 'portrait',
                    platformName: 'iOS',
                    platformVersion: '11.2',
                    browserName: 'Safari',
                },
                android: {
                    appiumVersion: '1.8.1',
                    deviceName:"Android Emulator",
                    platformName: 'Android',
                    platformVersion: '6.0',
                    browserName: 'Chrome',
                },
            },
            // browser: 'chrome,firefox,safari,edge,ie',
            // parentTunnel: 'username',
            browser: 'chrome',
            timeout: 50000,
            retry: 7,
            // SAUCELABS_USERNAME: 'your-username',
            // SAUCELABS_ACCESS_KEY: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        testingbot: {
            browsers: {
                chrome: {
                    platform: 'ANY',
                    version: '67'
                },
            },
            browser: 'chrome',
            timeout: 50000,
            retry: 7,
            // TESTINGBOT_USERNAME: 'your-username',
            // TESTINGBOT_ACCESS_KEY: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        browserstack: {  // Platform can be one of
            browsers: {  // MAC, WIN8, XP, WINDOWS, and ANY
                chrome: {
                    platform: 'ANY',
                    version: '67'
                },
                firefox: {
                    platform: 'ANY',
                    version: '61'
                },
                safari: {
                    platform: 'MAC',
                    version: '11'
                },
                edge: {
                    platform: 'WINDOWS',
                    version: '17'
                },
                ie: {
                    platform: 'WIN8',
                    version: '11'
                },
                iphone8: {
                    device: 'iPhone 8',
                    build: 'Node IOS',
                    name: 'single_test',
                    os_version: '11.0',
                },
                samsung8: {
                    device: 'Samsung Galaxy S8',
                    build: 'Node Android',
                    name: 'single_test',
                    os_version: '7.0',
                },
                samsung9: {
                    device: 'Samsung Galaxy S9',
                    build: 'Node Android',
                    name: 'single_test',
                    os_version: '8.0',
                }
            },
            browser: 'edge',
            timeout: 50000,
            retry: 7
            // BROWSERSTACK_USERNAME: 'your-username',
            // SAUCE_ACCESS_KEY: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        crossbrowsertesting: {
            browsers: {
                chrome: {
                    build: 'Node Desktop',
                    platform: 'WIN7',
                    version: '67'
                },
                firefox: {
                    build: 'Node Desktop',
                    platform: 'ANY',
                    version: '61'
                },
                safari: { // not working
                    build: 'Node Desktop',
                    browserName: 'Safari',
                    version: '10',
                    platform: 'Mac OSX 10.12'
                },
                edge: {
                    build: 'Node Desktop',
                    platform: 'WINDOWS',
                    version: '17'
                },
                ie: {
                    build: 'Node Desktop',
                    platform: 'ANY',
                    version: '11'
                },
                iphone8: {
                    build: 'Node IOS',
                    browserName: 'Safari',
                    deviceName: 'iPhone 8 Simulator',
                    platformVersion: '11.0',
                    platformName: 'iOS',
                    name: 'single_test',
                },
                nexus9: {
                    build: 'Node Android',
                    browserName: 'Chrome',
                    deviceName: 'Nexus 9',
                    platformVersion: '6.0',
                    platformName: 'Android',
                    name: 'single_test',
                },
            },
            browser: 'chrome',
            timeout: 50000,
            retry: 7,
            // CROSSBROWSERTESTING_USERNAME: 'your-username',
            // CROSSBROWSERTESTING_ACCESS_KEY: 'xxxxxxxxxxxxxxxx',
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
