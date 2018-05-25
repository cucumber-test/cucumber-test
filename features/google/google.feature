Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

@test:1 @google
Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
    Then I expect that the title is "Google"

@__non_mobile @__chrome @__non_url:localhost
Scenario: Search cucumber-test
    When I set "${g.search}" to the inputfield "${g.q}"
    And I click on appearing button "${g.btnG}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible

@__non_mobile @__non_chrome
Scenario: Search cucumber-test
    When I set "${g.search} *" to the inputfield "${g.q}"
    And I click on appearing button "${g.btnG}"
    Then I expect that element "a[href='https://en.wikipedia.org/wiki/Cucumber_(software)']" becomes visible

@__mobile
Scenario: Search cucumber-test
    When I set "cucumber-test mobile" to the inputfield "${g.q}"
    And I click on appearing button "${g.btnM}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible