@simple
Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
    Then I expect that the title is "Google"

Scenario: Search cucumber-test
    When I set "cucumber-test" to the inputfield "[name=q]"
    And I expect that element "[name=q]" becomes visible
    When I click on the button "input.lsb"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
