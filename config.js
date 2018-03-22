module.exports = (faker) => {
    return {
        browsers: {
            "firefox:M52": {
                platform: 'MAC',
                version: 52
            },
            "firefox:W52": {
                platform: 'WIN8',
                version: 52
            },
            safari: {
                platform: 'MAC'
            },
            chrome: {},
            firefox: {},
        },
        browserstack: {},
        saucelabs: {
            browsers: {
                chrome: {
                    platform: 'WIN7',
                    version: '65'
                },
                "firefox": {
                    platform: 'WIN7',
                    version: '59'
                },
                safari: {
                    platform: 'macOS 10.12',
                    version: '10.1'
                },
                ie: {
                    browserName: 'internet explorer',
                    platform: 'WIN7',
                    version: '11'
                }
            },
            browser: 'chrome,firefox,safari,ie'
        },
        perfecto: {},
        remote: {
            remote: 'http://10.193.94.142:4444', //'http://localhost:4444',
            browser: 'firefox,chrome'
        },
        general: {
            android: 'f344ee26:7.0',
            browser: 'firefox,chrome,safari',
            retry: 6
        },
        vars: {
            g: {
                q: '[name=q]',
                btnG: 'input.lsb', //'[name=btnK]',
                btnM: 'button._S6q',
                search: 'cucumber-test',
                url: 'https://google.com',
                cucumberIo: "a[href='https://cucumber.io/']",
                email: faker.internet.email()
            }
        }
    }
}
// proxy: {
//     proxyType: 'MANUAL',
//     httpProxy: 'domain:80',
//     sslProxy: 'domain:443'
// }
