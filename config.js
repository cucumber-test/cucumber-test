module.exports = () => {
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
            chrome: { platform: 'MAC' },
            safari: { platform: 'MAC' },
            firefox: { platform: 'MAC' },
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
