Feature: Share Scenario
    To be share during automation

@test:1
Scenario: Navigate to Google
    Given I open the url "https://www.google.com"
     Then I expect that the title is "Google"

@__non_mobile @__chrome @__non_url:localhost
Scenario: Search cucumber-test
    When I set "${g.search}" to the inputfield "${g.q}"
     And I click on appearing button "${g.btnG}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible

@__non_mobile @__non_chrome @__non_internetexplorer
Scenario: Search cucumber-test
    When I set "${g.search} *" to the inputfield "${g.q}"
     And I click on appearing button "${g.btnG}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible

@__non_mobile @__ie
Scenario: Search cucumber-test
    When I set "${g.search} firefox" to the inputfield "${g.q}"
     And I press "Return" to the inputfield "${g.q}"
    Then I expect that element "a[href='https://docs.cucumber.io/']" becomes visible

@__mobile
Scenario: Search cucumber-test
    When I set "${g.search} mobile" to the inputfield "${g.q}"
     # And I press "Return" to the inputfield "${g.q}"
     And I click on appearing button "${g.btnI}"
    Then I expect that element "a[href='https://cucumber.io/']" becomes visible
