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
6. run `cct` (or `cct -b chrome,firefox,safari`)

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
    And I expect that element "[name=q]" becomes visible
    When I click on the button "input.lsb"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
```
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

@chrome
Scenario: Search cucumber-test
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I expect that element "[name=q]" becomes visible
    When I click on the button "input.lsb"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible

@mobile
Scenario: Search cucumber-test
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I expect that element "[name=q]" becomes visible
    When I click on the button "[name=btnG]"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
```
```bash
# Install appium server
npm install -g appium appium-doctor
# run appium & connect your android device using USB
appium
# check deviceName - adb devices & pass to deviceName:android version
cct -t '@simple and not @chrome' --android f344ee26:7.0
```

## Integration with: Sauce Labs
Add these env variables, your SauceLabs user & key:
```bash
export SAUCE_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export SAUCE_USERNAME=cucumber-test
cct -c saucelabs:tunnelling
cct -c saucelabs
```

![alt #D Saucelabs](docs/saucelabs.png)

## Behind Proxy / VPN:

```bash
npm install -g selenium-standalone@latest
NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone install
NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone start
NODE_TLS_REJECT_UNAUTHORIZED=0 cct -t '@simple or @smoke'
```

## Dev Mode

```bash
cd ~/.nvm/versions/node/v8.8.1/lib/node_modules
ln -s /Users/wharsojo/Dev/cucumber-test cucumber-test
```

## License

MIT
