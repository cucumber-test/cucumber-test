const browserTags = [
    '@__chrome',
    '@__safari',
    '@__firefox',
    '@__microsoftedge',
    '@__internetexplorer'
];
const nonBrowserTags = [
    '@__non_chrome',
    '@__non_safari',
    '@__non_firefox',
    '@__non_microsoftedge',
    '@__non_internetexplorer'
];
const mobileTags = [
    '@__android',
    '@__mobile',
    '@__ios'
];
const nonMobileTags = [
    '@__non_android',
    '@__non_mobile',
    '@__non_ios'
];

function browserName() {
    const {browserName} = global.browser.desiredCapabilities;
    return browserName.toLowerCase().replace(/ /g,'');
}

function isBrowserTag(tagName) {
    const browserId = browserName();
    const arr = tagName.split('||');
    if (browserTags.indexOf(arr[0])>-1) {
        if (arr[0]===`@__${browserId}`) {
            return 1;
        } else if (arr.length>1){
            return isMobileTag(`@__${arr[1]}`)
        } else {
            return 0;
        }
    }
    if (nonBrowserTags.indexOf(arr[0])>-1) {
        return arr[0]===`@__non_${browserId}` ? 0 : 1;
    }
    return 1;
}

function isMobileTag(tagName) {
    const chkMobiles = {
        '@__android': global.browser.isAndroid,
        '@__mobile': global.browser.isMobile,
        '@__ios': global.browser.isIOS
    }
    const chkNonMobiles = {
        '@__non_android': !global.browser.isAndroid,
        '@__non_mobile': !global.browser.isMobile,
        '@__non_ios': !global.browser.isIOS
    }
    if (mobileTags.indexOf(tagName)>-1) {
        return chkMobiles[tagName] ? 1 : 0;
    }
    if (nonMobileTags.indexOf(tagName)>-1) {
        return chkNonMobiles[tagName] ? 1 : 0;
    }
    return 1;
}

const seleniumArgs = {
    // baseURL: 'https://selenium-release.storage.googleapis.com',
    // version: '3.7.1',
    drivers: {
        chrome: {
            version: '2.33',
            arch: process.arch,
            baseURL: 'https://chromedriver.storage.googleapis.com'
        },
        firefox: {
            version: '0.19.1',
            arch: process.arch,
            baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
        },
        safari: {
            version: '2.48',
            arch: process.arch,
            baseURL: 'https://selenium-release.storage.googleapis.com'
        }
    }
};

exports.config = {
    //
    // =================
    // Service Providers
    // =================
    // WebdriverIO supports Sauce Labs, Browserstack, and Testing Bot (other
    // cloud providers should work too though). These services define specific
    // user and key (or access key) values you need to put in here in order to
    // connect to these services.
    //
    // user: process.env.SAUCE_USERNAME,
    // key: process.env.SAUCE_ACCESS_KEY,

    seleniumArgs,
    seleniumInstallArgs: seleniumArgs,

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the
    // directory from which `wdio` was called. Notice that, if you are calling
    // `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script)
    // then the current working directory is where your package.json resides, so
    // `wdio` will be called from there.
    //
    // specs: ['./features/**/*.feature'],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities
    // at the same time. Depending on the number of capabilities, WebdriverIO
    // launches several test sessions. Within your capabilities you can
    // overwrite the spec and exclude options in order to group specific specs
    // to a specific capability.
    //
    // First, you can define how many instances should be started at the same
    // time. Let's say you have 3 different capabilities (Chrome, Firefox, and
    // Safari) and you have set maxInstances to 1; wdio will spawn 3 processes.
    // Therefore, if you have 10 spec files and you set maxInstances to 10, all
    // spec files will get tested at the same time and 30 processes will get
    // spawned. The property handles how many capabilities from the same test
    // should run tests.
    //
    maxInstances: 1,
    //
    // If you have trouble getting all important capabilities together, check
    // out the Sauce Labs platform configurator - a great tool to configure your
    // capabilities: https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [],
    //     {
    //         // maxInstances can get overwritten per capability. So if you have an
    //         // in-house Selenium grid with only 5 firefox instance available you can
    //         // make sure that not more than 5 instance gets started at a time.
    //         maxInstances: 5,
    //         //
    //         browserName: 'chrome'
    //     }
    // ],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async
    // way e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result |
    // error
    logLevel: 'error',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your url
    // parameter starts with "/", then the base url gets prepended.
    baseUrl: 'http://localhost:8080',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object
    // should have the plugin name as key and the desired plugin options as
    // properties. Make sure you have the plugin installed before running any
    // tests. The following plugins are currently available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They
    // enhance your test setup with almost no effort. Unlike plugins, they don't
    // add new commands. Instead, they hook themselves up into the test process.
    services: [],
    // services: ['sauce'],
    // user: process.env.SAUCE_USERNAME,
    // key: process.env.SAUCE_ACCESS_KEY,
    // sauceConnect: true,    //
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework
    // installed before running any tests.
    framework: 'cucumber',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    reporters: ['spec'],
    //
    // If you are using Cucumber you need to specify the location of your step
    // definitions.
    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> filetype:compiler used for processing required features
        compiler: ['js:babel-register'],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: true,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: false,
        // <string[]> ("extension:module") require files with the given
        // EXTENSION after requiring MODULE (repeatable)
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <string[]> (file/dir) require files before executing features
        require: [
            `${__dirname}/lib/steps/given.js`,
            `${__dirname}/lib/steps/then.js`,
            `${__dirname}/lib/steps/when.js`
        ],
        // <string> specify a custom snippet syntax
        snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <string> (expression) only execute the features or scenarios with
        // tags matching the expression, see
        // https://docs.cucumber.io/tag-expressions/
        tagExpression: 'not @Pending',
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: true,
        // <number> timeout for step definitions
        timeout: 20000
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test
    // process in order to enhance it and to build services around it. You can
    // either apply a single function or an array of methods to it. If one of
    // them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    // onPrepare: function onPrepare(config, capabilities) {
    // },
    //
    // Gets executed before test execution begins. At this point you can access
    // all global variables, such as `browser`. It is the perfect place to
    // define custom commands.
    before: function before() {
        /**
         * Setup the Chai assertion framework
         */
        const chai = require('chai');

        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        if (process.argv.indexOf('--uaIphone')!==-1) {
            console.log('setViewportSize: { width: 414, height: 736 }');
            global.browser.setViewportSize({ width: 414, height: 736 });
        } else if (process.argv.indexOf('--uaGalaxy')!==-1) {
            console.log('setViewportSize: { width: 414, height: 736 }');
            global.browser.setViewportSize({ width: 414, height: 736 });
        } else if (!global.browser.isMobile) {
            global.browser.windowHandleSize({width: 1240, height: 768});
        }
    },
    beforeFeature: function(event) {
        const {vars} = global.browser.options;

        console.log('>>>>>',`@__${browserName()}`);
        event.scenarios = event.scenarios.filter(x=>{
            // variable parser
            x.steps.forEach(obj => {
                const varNames = obj.name.match(/\${([A-z.]+)}/g);
                if (varNames) {
                    varNames.forEach(varName=> {
                        let items = vars;
                        varName.replace(/[${}]/g,'').trim().split('.').forEach(i => {
                            if (items!==undefined)
                                items = items[i];
                        })
                        if (items!==undefined) {
                            obj.name = obj.name.replace(varName, items);
                        }
                    })
                }
            })
            if (x.tags) {
                const isBrowserTags = x.tags.map(y => isBrowserTag(y.name)).sort();
                const isMobileTags = x.tags.map(y => isMobileTag(y.name)).sort();
                return (isBrowserTags[0] + isMobileTags[0])===2
            }
            return true;
        });
    },
    // beforeStep: function(event) {
    // },
    //
    // Hook that gets executed before the suite starts
    // beforeSuite: function beforeSuite(suite) {},
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g.
    // runs before calling beforeEach in Mocha)
    // beforeHook: function beforeHook() {
    // },
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs
    // after calling afterEach in Mocha)
    // afterHook: function afterHook() {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in
    // Cucumber) starts.
    // beforeTest: function beforeTest(test) {},
    //
    // Runs before a WebdriverIO command gets executed.
    beforeCommand: function beforeCommand(commandName, args) {
        if (args[1] !== '*internal*') {
            var arg = args[0] === undefined ? '' : args[0];
            if (commandName === 'frame') {
                arg = Object.keys(arg);
            }
            console.log('commandName:', commandName, arg);
        }
    }
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function afterCommand(commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in
    // Cucumber) starts.
    // afterTest: function afterTest(test) {
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function afterSuite(suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all
    // global variables from the test.
    // after: function after(result, capabilities, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to
    // exit. It is not possible to defer the end of the process using a promise.
    // onComplete: function onComplete(exitCode) {
    // }
};
