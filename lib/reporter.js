'use strict';

const util = require('util'),
      events = require('events');

const CustomReporter = function (baseReporter, config, options) {
    this.on('runner:end', function (runner) {
        const stats = baseReporter.stats;
        const results = stats.runners[runner.cid];
        const specHash = stats.getSpecHash(runner);
        const { suites } = results.specs[specHash];

        console.log('Preprocessing report...');
        for (const specUid in suites) {
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