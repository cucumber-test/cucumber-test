module.exports = (faker) => {
    return {
        browsers: {
            chrome: {},
            firefox: {},
            safari: { platform: 'MAC' },
            edge: { browserName: 'microsoftEdge' },
            ie: { browserName: 'internet explorer',
                version: '11'
            }
        },
        browserstack: {
            browsers: {
                edge: {
                    unhandledPromptBehavior: 'accept',
                    platform: 'WINDOWS',
                    version: '16'
                },
            },
            browser: 'edge',
            timeout: 50000,
            retry: 7
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
                    appiumVersion: '1.7.2',
                    deviceName:"iPhone 8 Plus Simulator",
                    deviceOrientation: 'portrait',
                    platformName: 'iOS',
                    platformVersion: '11.2',
                    browserName: 'Safari',
                },
                android: {
                    appiumVersion: '1.7.2',
                    deviceName:"Android Emulator",
                    platformName: 'Android',
                    platformVersion: '6.0',
                    browserName: 'Chrome',
                },
            },
            browser: 'chrome,firefox,safari,edge,ie',
            timeout: 50000,
            retry: 7
        },
        perfecto: {},
        remote: {
            remote: 'http://localhost:4444',
            browser: 'firefox,chrome',
            timeout: 40000,
            retry: 6
        },
        base: {
            name: 'CCT',
            cloud: 'saucelabs',
            android: 'f344ee26:7.0',
            browser: 'firefox,chrome,safari',
            inputPause: 500,
            timeout: 20000,
            retry: 3
        },
        vars: {
            g: {
                q: '[name=q]',
                btnG: 'input.lsb',
                btnM: 'button._S6q',
                search: 'cucumber-test',
                url: 'https://google.com',
                cucumberIo: "a[href='https://cucumber.io/']",
                email: faker.internet.email()
            }
        }
    }
}
