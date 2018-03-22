module.exports = (faker) => {
    return {
        browsers: {
            chrome: {},
            firefox: {},
            safari: { platform: 'MAC' }
        },
        browserstack: {
            browsers: {
                browserName: 'microsoftEdge',
                platform: 'Windows 10',
                version: '16'
            },
            browser: 'edge'
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
                    browserName: 'microsoftEdge',
                    platform: 'Windows 10',
                    version: '16.16299'
                },
                ie: {
                    browserName: 'internet explorer',
                    platform: 'WIN7',
                    version: '11'
                }
            },
            browser: 'chrome,firefox,safari,edge,ie'
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
