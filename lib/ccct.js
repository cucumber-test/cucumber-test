'use strict';

const fs = require('fs-extra');
const program = require('commander');

program.version('1.0.0');
program.option('-q, --quickstart', 'very simple cucumber automation');
program.option('-g, --google', 'example google website automation');
program.option('-c, --config', 'copy config.js');

program.parse(process.argv);

let src = `${__dirname}/../`,
    tgt = `${process.cwd()}`;
const endMsg = "\nautomation demo is created...\n";
if (program.quickstart) {
    fs.copySync(`${src}example/quickstart`, tgt);
    console.log(endMsg);
    console.log("how to run: cct -f google\n\n");
} else if (program.google) {
    fs.copySync(`${src}example/demo`, tgt);
    console.log(endMsg);
    console.log("how to run: cct -f google -d\n\n");
} else {
    program.outputHelp();
    console.log("\n  Create-Cucumber-Test ( ccct )\n");
}
if (program.config) {
    fs.copySync(`${src}config.js`, `${tgt}/config.js`);
}

process.exit(0);