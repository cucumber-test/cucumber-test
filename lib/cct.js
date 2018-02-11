'use strict';

var program = require('commander');

var _require = require('webdriverio'),
    Launcher = _require.Launcher;

console.log('Loading...');

program.on('-h, --help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ custom-help --help');
    console.log('    $ custom-help -h');
    console.log('');
});
program.version('0.1.0');
program.option('-t, --tags [tags]', 'Run Featurs filtered by tags');
program.option('-s, --souce', 'Run in Souce lab cloud service');

program.parse(process.argv);

var tagExpression = program.tags || '@simple';

console.log('Tags:', tagExpression);

var options = {
    cucumberOpts: {
        tagExpression: tagExpression
    }
};

if (program.souce) {
    options.sauceConnect = true;
    options.services = ['selenium-standalone', 'sauce'];
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
//--cucumberOpts.tagExpression=@Tag,@AnotherTag