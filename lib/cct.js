'use strict';

var program = require('commander');

var _require = require('webdriverio'),
    Launcher = _require.Launcher;

console.log('Loading...');

program.version('1.0.5');
program.on('-h, --help', function () {
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

program.parse(process.argv);

var tagExpression = program.tags || '@simple';

console.log('Tags:', tagExpression);

var options = {
    cucumberOpts: {
        tagExpression: tagExpression
    }
};

var instances = +(program.instances || 1);
var browser = program.browser || 'chrome';
console.log('Browser:', browser);
options.maxInstances = instances;
options.capabilities = browser.split(',').map(function (x) {
    return {
        maxInstances: 5,
        browserName: x
    };
});

if (program.souce) {
    options.sauceConnect = true;
    options.user = process.env.SAUCE_USERNAME;
    options.key = process.env.SAUCE_ACCESS_KEY;
    console.log('Run from Sauce Labs Cloud');
}

var wdio = new Launcher(__dirname + '/../wdio.conf.js', options);

wdio.run().then(function (code) {
    process.exit(code);
}, function (error) {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});