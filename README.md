# Cucumber Test

<a href="https://www.browserstack.com/automate/public-build/elU2bmp1MzhoYkZ5a1RqNDRwSThGK1BZYk1tc202enhKNDVULzZIN25vUT0tLXIyVlZkTEd5WVB0T3VUZ1ZGMWxML0E9PQ==--447f59bf19bfd645f779420ae2540c385fde5988"><img src='https://www.browserstack.com/automate/badge.svg?badge_key=elU2bmp1MzhoYkZ5a1RqNDRwSThGK1BZYk1tc202enhKNDVULzZIN25vUT0tLXIyVlZkTEd5WVB0T3VUZ1ZGMWxML0E9PQ==--447f59bf19bfd645f779420ae2540c385fde5988'/></a>

Made easy - Cucumber testing using webdriver.io, instead of writing complicated
test code that only developers can understand, Cucumber maps an ordinary
language to code and allows to start with the test process in the early stages
of your product development. `cucumber-test` is a fork of
`cucumber-boilerplate`.

## Quick start

1. npm install -g cucumber-test selenium-standalone@6.15.0
2. selenium-standalone install
3. selenium-standalone start
4. create folder `features/google`
5. add file `features/google/google.feature`
6. run `cct -f google -d` (or `cct -f google -d -b chrome,firefox,safari -i 2`)

if step 2,3 show some warnings, might be behind proxy / VPN, please check section `Behind proxy or vpn` below.

```cucumber
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

// url related
@__url           ex: =>  @__url:/search
@__mainUrl       ex: =>  @__mainUrl:/search
@__non_url       ex: =>  @__non_url:/search
@__non_mainUrl   ex: =>  @__non_mainUrl:/search
@__waitForUrl    ex: =>  @__waitForUrl:/search

// Selector, it can be css or xpath (without `@`)
@__$             ex: =>  @__$://*[class='dialog']//button

// cookies
@__cookies       ex: => @ __cookies:user=alex,locale=US

// for development
@__debug
```
Sample usage can be seen on the example below `Search on Google`, when it get executed on the desktop browser like chrome, firefox or IE, it will pickup scenario with:

`@__non_safari @__non_mobile` and the `@__mobile` will be filtered

and viceversa will happened when it get executed on mobile.

## Appium
### Android device
please check the developer tools security options, ensure them to be checked.
* USB debugging
* USB debugging(Security settings)

```cucumber
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
cct -f google -d --android f344ee26:7.0
```

## Fits (Feature in tight scenario)
Enhancement on how to write cucumber-test, this feature will make developer much faster to produce automation, as simpler to write the tests. `-d / --dev` is the option to trigger  compiling from `fits` folder to `feature` folder.

When run in the jenkins job, usually folders are readonly, make sure `-d` is excluded from job.

`flib/share.feature`
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

`fits/google/google.feature`
```cucumber
Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

Scenario: Navigate to Google
Scenario: Search cucumber-test

$ cct -f google -d -b safari
```

## Config & Variables
Setting up browsers capabilities and adding variables that can be use inside steps statement. Put [`config.js`](https://github.com/cucumber-test/cucumber-test/blob/master/config.js) in the current folder (above features folder) where you will run cucumber-test.

[`config.js`](https://github.com/cucumber-test/cucumber-test/blob/master/config.js)
will automatically pickup by runner or you can provide the fullpath in CLI:
```bash
cct -f google -d --config ./config.js -b chrome
cct -f google -d -b chrome,safari,firefox
```

## Integration with SauceLabs
Add these env variables from your [Saucelabs](docs/saucelabs.png) user & key:
```bash
export SAUCE_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export SAUCE_USERNAME=cucumber-test
cct -f google -d -c saucelabs:connect
cct -f google -d -c saucelabs
```

## Integration with BrowserStack
Add these env variables from your [BrowserStack](docs/BrowserStack.gif) user & key:
```bash
export BROWSERSTACK_ACCESS_KEY=xxXXXxXxXxXxxXxXXXxx
export BROWSERSTACK_USERNAME=cucumber-test
cct -f google -d -c browserstack
```

## Behind proxy or vpn:

```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
npm install -g selenium-standalone@6.15.0
selenium-standalone install
selenium-standalone start
cct -f google -d
```
This env vars can be keep into bash/zsh profile/rc
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Tips

#### Selenium-standalone known problem
`ERROR: Unable to create new service ... driver.version: unknown` need to down-grade selenium-standalone to `~6.15.0`

#### Safari (technology preview) known problem
[Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) is the best way to get the latest update of the webdriver included in Safari.

`You must enable the "Allow Remote Automation"`, you need to launch Safari and go to the menu "Develop > Allow Remote Automation" & make sure that it is checked.

`Hang or Error(from selenium-standalone): safaridriver could not launch because it is not configured correctly`, need to open a terminal console and manually configure as a super user: "sudo safaridriver --enable".

#### Firefox known problem
[`cannot access dead object`](https://github.com/mozilla/geckodriver/issues/614), the open ticket was filled on April 8, 2017. should be careful if plan to create scenario involved with iframe.

[`element#id is not supported in geckodriver`](https://github.com/webdriverio/webdriverio/issues/2392), the open ticket was filled on Nov 2, 2017. see locator strategy in [`w3c.org`](https://www.w3.org/TR/webdriver/#locator-strategies).

## Dev Mode

```bash
cd ~/.nvm/versions/node/v8.8.1/lib/node_modules
ln -s /Users/wharsojo/Dev/cucumber-test cucumber-test
```

## License

MIT

### Big Thanks

![alt SauceLabs](docs/Sauce-Labs_Horiz_Red-Grey_RGB_250x35.png)

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs]( https://saucelabs.com)

<img src="docs/browserstack-logo-600x315.png" alt="alt BrowserStack" width="300">
