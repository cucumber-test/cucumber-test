const fs = require('fs');
const program = require('commander');

module.exports = _ => {
    program.version('1.2.50');
    program.option('-f, --features [path]', 'location of features/[path]');
    program.option('-s, --specs [files]', 'location pattern files');
    program.option('-t, --tags [tags]', 'run features filtered by tags');
    program.option('-r, --remote [host]', 'remote server [http://ex.com:4444]');
    program.option('-c, --cloud [provider]', 'cloud [saucelabs, browserstack, perfecto]');
    program.option('-i, --instances [instances]', 'max instances');
    program.option('-b, --browser [browser]', 'target browser');
    program.option('-n, --name [name]', 'capability name');
    program.option('-d, --dev', 'compile fits to feature');
    program.option('--timeout [timeout]', 'timeout [20000]');
    program.option('--retry [retry]', 'connection retry [3]');
    program.option('--config [fpath]', 'config [./config.js]');
    program.option('--android [android]', 'run on android device');
    program.option('--uaIphone', 'chrome w/ user agent of iPhone');
    program.option('--uaGalaxy', 'chrome w/ user agent of Samsung Galaxy');
    program.option('--vars [json]', `vars '{"g":{"search":"automation"}}'`);

    program.parse(process.argv);

    if (program.config===undefined && fs.existsSync(process.cwd()+'/config.js')) {
        program.config = 'config.js';
    }
    return program;
}
