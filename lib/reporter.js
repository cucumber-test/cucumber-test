'use strict';

var util = require('util'),
    events = require('events');

var CustomReporter = function CustomReporter(baseReporter, config, options) {
    this.on('runner:end', function (runner) {
        var stats = baseReporter.stats;
        var results = stats.runners[runner.cid];
        var specHash = stats.getSpecHash(runner);
        var suites = results.specs[specHash].suites;


        console.log('Preprocessing report...');
        for (var specUid in suites) {
            if (suites[specUid].title === '...') {
                delete suites[specUid];
            }
        }
    });
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