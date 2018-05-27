Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

@google
Scenario: Navigate to Google

@__waitForUrl:googler
Scenario: Skipped scenario
    When I set "not reach here" to the inputfield "${g.q}"

@__$://*[id='lga'] @__cookies:user=wharsojo
Scenario: Selector found
    When I set "selector found in here" to the inputfield "${g.q}"

Scenario: Search cucumber-test
