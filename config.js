module.exports = () => {
    return {
        browsers: {
            chrome: {
                platform: 'MAC',
            },
            "firefox:M52": {
                platform: 'MAC',
                version: 52
            },
            "firefox:W52": {
                platform: 'WIN8',
                version: 52
            },
            "firefox": {
                platform: 'MAC',
                version: 48
            }
        },
        saucelabs: {
            //
        },
        browserstack: {
            //
        },
        vars: {
            g: {
                input: '[name=q]',
                btnG: '[name=btnG]',
                btnGMobile: 'input.lsb',
                search: 'cucumber-test',
                url: 'https://google.com',
                cucumberIo: "a[href='https://cucumber.io/']"
            }
        }
    }
}
// proxy: {
//     proxyType: 'MANUAL',
//     httpProxy: 'domain:80',
//     sslProxy: 'domain:443'
// }
