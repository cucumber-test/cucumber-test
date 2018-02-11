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
