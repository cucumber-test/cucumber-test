const util = require('util'),
    chalk = require('chalk'),
    events = require('events');

const CustomReporter = function(baseReporter, config, options) {
    this.on('runner:end', function (runner) {
        const stats = baseReporter.stats;
        const results = stats.runners[runner.cid];
        const specHash = stats.getSpecHash(runner);
        const {suites} = results.specs[specHash];

        console.log(chalk.redBright('Preprocessing report...'));
        for (const specUid in suites) {
            if (suites[specUid].title==='...') {
                delete suites[specUid];
            }
        }
    })
};
CustomReporter.reporterName = 'cct-reporter';

/**
 * Inherit from EventEmitter
 */
util.inherits(CustomReporter, events.EventEmitter);

/**
 * Expose Custom Reporter
 */
exports = module.exports = CustomReporter;
