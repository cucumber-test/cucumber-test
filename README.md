# Cucumber Test

Made easy - Cucumber testing using webdriver.io Instead of writing complicated
test code that only developers can understand, Cucumber maps an ordinary
language to code and allows to start with the test process in the early stages
of your product development.

## Quick start

1. npm i -g cucumber-test
2. create folder "features"
3. add new file "simple.feature" inside "features" folder
4. run cucumber-test: "cct"

```cucumber
@simple
Feature:
    Search on Google

Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
    Then I expect that the title is "Google"

Scenario: Search cucumber-test
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I press "Enter"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
```

## Integration with: Sauce Labs

```bash
export SAUCE_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
export SAUCE_USERNAME=cucumber-test
cct -s
```

![alt #D Saucelabs](docs/saucelabs.png)

Behind Proxy / VPN:

```bash
# https://github.com/vvo/selenium-standalone/issues/8
npm install -g selenium-standalone@latest
NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone install
NODE_TLS_REJECT_UNAUTHORIZED=0 selenium-standalone start
NODE_TLS_REJECT_UNAUTHORIZED=0 cct -t '@simple or @lol'
```

## Dev Mode

```bash
cd ~/.nvm/versions/node/v8.8.1/lib/node_modules
ln -s /Users/wharsojo/Dev/cucumber-test cucumber-test
```

## License

MIT
