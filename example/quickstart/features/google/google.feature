# cct -f googleß

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
