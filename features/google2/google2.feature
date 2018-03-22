Feature: Search on Google
    Search should be on the google website
    and the first should be cucumber.io

Scenario: Navigate to Google
    Given I open the url "${g.url}"
    Then I expect that the title is "Google"

@__non_mobile
Scenario: Search cucumber-test on desktop browser
    When I set "${g.search}" to the inputfield "${g.q}"
    And I expect that element "${g.btnG}" becomes visible
    And I click on the button "${g.btnG}"
    Then I expect that element "${g.cucumberIo}" becomes visible

@__mobile
Scenario: Search cucumber-test on mobile browser
    When I set "${g.search}" to the inputfield "${g.q}"
    And I expect that element "${g.btnM}" becomes visible
    And I click on the button "${g.btnM}"
    Then I expect that element "${g.cucumberIo}" becomes visible
