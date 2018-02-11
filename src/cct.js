const program = require('commander');
const { Launcher } = require('webdriverio');

console.log('Loading...');

program.version('1.0.5');
program.on('-h, --help', function() {
    console.log('  Examples:');
    console.log('');
    console.log('    $ custom-help --help');
    console.log('    $ custom-help -h');
    console.log('');
});
program.option('-t, --tags [tags]', 'Run Featurs filtered by tags');
program.option('-s, --souce', 'Run in Souce labs cloud service');
program.option('-b, --browser [browser]', 'Target Browser');

program.parse(process.argv);

const tagExpression = program.tags || '@simple';

console.log('Tags:', tagExpression);

const options = {
    cucumberOpts: {
        tagExpression
    }
};

const browser = program.browser || 'chrome';
console.log('Browser:', browser);
options.capabilities = browser.split(',').map(x => {
    return {
        maxInstances: 5,
        browserName: x
    }
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
