# Cucumber Test

Made easy - Cucumber testing using webdriver.io, instead of writing complicated
test code that only developers can understand, Cucumber maps an ordinary
language to code and allows to start with the test process in the early stages
of your product development. `cucumber-test` is a fork of
`cucumber-boilerplate`.

## Quick start

1. npm install -g cucumber-test selenium-standalone
2. selenium-standalone install
3. selenium-standalone start
4. create folder `features`
5. add file `features/simple.feature`
6. run `cct` (or `cct -b chrome,firefox,safari --timeout 40000 -i 3`)

if step 2,3 show some warnings, might be behind proxy / VPN, please check section `Behind Proxy / VPN:` below.

```cucumber
@simple
Feature:
    Search on Google

Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
    Then I expect that the title is "Google"

Scenario: Search cucumber-test
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I expect that element "input.lsb" becomes visible
    And I click on the button "input.lsb"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
```

## Extended tags
Extended tags will simplify how to write cucumber with different browser & environment, those information are available on the browser object, utilize during execution of the cucumber file:
```js
// Browsers
@__chrome            ><  @__non_chrome
@__safari            ><  @__non_safari
@__firefox           ><  @__non_firefox
@__microsoftedge     ><  @__non_microsoftedge
@__internetexplorer  ><  @__non_internetexplorer

// Mobile specific
@__android           ><  @__non_android
@__mobile            ><  @__non_mobile
@__ios               ><  @__non_ios
```
Sample usage can be seen on the example below `Search on Google`, when it get executed on the desktop browser like chrome, firefox or IE, it will pickup scenario with:

`@__non_safari @__non_mobile` and the `@__mobile` will be filtered

and viceversa will happened when it get executed on mobile.

## Appium
### Android Device
please check the developer tools security options, ensure them to be checked.
* USB debugging
* USB debugging(Security settings)

```cucumber
@simple
Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
    Then I expect that the title is "Google"

@__non_safari @__non_mobile
Scenario: Search cucumber-test on desktop browser
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I expect that element "input.lsb" becomes visible
    And I click on the button "input.lsb"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible

@__mobile
Scenario: Search cucumber-test on mobile browser
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I expect that element "[name=btnG]" becomes visible
    And I click on the button "[name=btnG]"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
```
```bash
# Install appium server
npm install -g appium appium-doctor
# run appium & connect your android device using USB
appium
# check deviceName - adb devices & pass to deviceName:android version
cct --android f344ee26:7.0
```

## Config & Variables
Setting up browsers capabilities and adding variables that can be use inside steps statement. Put `config.js` in the current folder (above features folder) where you will run cucumber-test.

`share.feature`
```cucumber
Feature: Share Scenario
    To be share during automation

Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
    Then I expect that the title is "Google"

@__non_mobile @__chrome @__non_url:localhost
Scenario: Search cucumber-test
    When I type "cucumber-test" to the inputfield "${g.q}"
    And I expect that element "${g.btnG}" becomes visible
    And I click on the button "${g.btnG}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible

@__non_mobile @__non_chrome
Scenario: Search cucumber-test
    When I type "cucumber-test *" to the inputfield "${g.q}"
    And I expect that element "${g.btnG}" becomes visible
    And I click on the button "${g.btnG}"
    Then I expect that element "a[href='https://en.wikipedia.org/wiki/Cucumber_(software)']" becomes visible

@__mobile
Scenario: Search cucumber-test
    When I type "cucumber-test mobile" to the inputfield "${g.q}"
    And I expect that element "${g.btnM}" becomes visible
    And I click on the button "${g.btnM}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
```

`google/google.feature`
```cucumber
Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

Scenario: Navigate to Google
    Given ...

Scenario: Search cucumber-test
    When ...
```

`config.js`
```js
module.exports = (faker) => {
    return {
        browsers: {
            chrome: {},
            firefox: {},
            safari: { platform: 'MAC' },
            edge: { browserName: 'microsoftEdge' },
            ie: { browserName: 'internet explorer',
                version: '11'
            }
        },
        browserstack: {
            browsers: {
                edge: {
                    unhandledPromptBehavior: 'accept',
                    platform: 'WINDOWS',
                    version: '16'
                },
            },
            browser: 'edge',
            timeout: 50000,
            retry: 7
        },
        saucelabs: {
            browsers: {
                chrome: {
                    platform: 'WIN7',
                    version: '65'
                },
                firefox: {
                    platform: 'WIN7',
                    version: '59'
                },
                "firefox:m52": {
                    platform: 'MAC',
                    version: '52'
                },
                safari: {
                    platform: 'macOS 10.12',
                    version: '10.1'
                },
                edge: {
                    platform: 'Windows 10',
                    version: '16'
                },
                ie: {
                    platform: 'WIN7'
                },
                ios: {
                    appiumVersion: '1.7.2',
                    deviceName:"iPhone 8 Plus Simulator",
                    deviceOrientation: 'portrait',
                    platformName: 'iOS',
                    platformVersion: '11.2',
                    browserName: 'Safari',
                },
                android: {
                    appiumVersion: '1.7.2',
                    deviceName:"Android Emulator",
                    platformName: 'Android',
                    platformVersion: '6.0',
                    browserName: 'Chrome',
                },
            },
            browser: 'chrome,firefox,safari,edge,ie',
            timeout: 50000,
            retry: 7
        },
        perfecto: {},
        remote: {
            remote: 'http://localhost:4444',
            browser: 'firefox,chrome',
            timeout: 40000,
            retry: 6
        },
        base: {
            name: 'CCT',
            cloud: 'saucelabs',
            android: 'f344ee26:7.0',
            browser: 'firefox,chrome,safari',
            inputPause: 500,
            timeout: 20000,
            instances: 1,
            retry: 3
        },
        tags: {
            __test: function(vars, string) {
                vars.g.search = `cucumber-io`;
                return true;
            }
        },
        vars: {
            g: {
                q: '[name=q]',
                btnG: 'input.lsb',
                btnM: 'button._S6q',
                search: 'cucumber-test',
                url: 'https://google.com',
                cucumberIo: "a[href='https://cucumber.io/']",
                email: faker.internet.email()
            }
        }
    }
}
```
`config.js` will automatically pickup by runner or you can provide the fullpath in CLI:
```bash
cct -f google --config ./config.js -b chrome
cct -f google -b chrome,safari,firefox
```

## Integration with: BrowserStack
Add these env variables from your BrowserStack user & key:
```bash
export BROWSERSTACK_ACCESS_KEY=xxXXXxXxXxXxxXxXXXxx
export BROWSERSTACK_USERNAME=cucumber-test
cct -c browserstack
```

![alt #D Saucelabs](docs/BrowserStack.gif)

## Integration with: Sauce Labs
Add these env variables from your SauceLabs user & key:
```bash
export SAUCE_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export SAUCE_USERNAME=cucumber-test
cct -c saucelabs:connect
cct -c saucelabs
```

![alt #D Saucelabs](docs/saucelabs.png)

## Behind Proxy / VPN:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm install -g selenium-standalone@latest
selenium-standalone install
selenium-standalone start
cct -t '@smoke'
```

## Dev Mode

```bash
cd ~/.nvm/versions/node/v8.8.1/lib/node_modules
ln -s /Users/wharsojo/Dev/cucumber-test cucumber-test
```

## License

MIT
