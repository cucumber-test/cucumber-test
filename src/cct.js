const program = require('commander');
const { Launcher } = require('webdriverio');

console.log('Loading...');

program.version('1.0.7');
program.on('-h, --help', function() {
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

program.parse(process.argv);

const tagExpression = program.tags || '@simple';

console.log('Tags:', tagExpression);

const options = {
    cucumberOpts: {
        tagExpression
    }
};

const instances = +(program.instances || 1);
const browser = program.browser || 'chrome';
console.log('Browser:', browser, program.iphone ? '--iphone' : '');
options.maxInstances = instances;
options.capabilities = browser.split(',').map(x => {
    const bconfig = {
        maxInstances: 5,
        browserName: x
    };
    if (x==='chrome' && program.iphone) {
        bconfig.chromeOptions = {
            args: ['use-mobile-user-agent', 'user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3']
        }
    }
    return bconfig;
})

if (program.souce) {
    options.sauceConnect = true;
    options.user = process.env.SAUCE_USERNAME;
    options.key = process.env.SAUCE_ACCESS_KEY;
    console.log('Run from Sauce Labs Cloud');
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
