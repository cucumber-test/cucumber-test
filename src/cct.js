const program = require('commander');
const { Launcher } = require('webdriverio');

console.log("Loading...")

program.on('-h, --help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    $ custom-help --help');
    console.log('    $ custom-help -h');
    console.log('');
});
program.version('0.1.0')
program.option('-t, --tags [tags]', 'Run Featurs filtered by tags');

program.parse(process.argv);

let tagExpression = (program.tags || '@simple');

console.log('Tags:', tagExpression);

const wdio = new Launcher(`${__dirname}/../wdio.conf.js`, {
    cucumberOpts: {
        tagExpression
    }
});

wdio.run().then(code => {
    process.exit(code);
}, error => {
    console.error('Launcher failed to start the test', error.stacktrace);
    process.exit(1);
});
//--cucumberOpts.tagExpression=@Tag,@AnotherTag
