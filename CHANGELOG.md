# Changelog

## [1.2.0] - 2018-03-28

### Share Scenario with Tags
share.feature now support multiple same scenario with different tags

```cucumber
@__chrome
Scenario: Search cucumber-test
    When I type "cucumber-test chrome" to the inputfield "${g.q}"

@__non_chrome
Scenario: Search cucumber-test
    When I type "cucumber-test non chrome" to the inputfield "${g.q}"
```
```cucumber
# those scenarios will be use as one scenario
Scenario: Search cucumber-test
    When ...
```

### config.js: `general` change to `base`
change the keyword of `general` to `base`. `base` more suitable for the base config.

## [1.1.0] - 2018-03-07

### Share Scenario
Repetitive scenario can be store to share.feature

## [1.0.17] - 2018-02-14

### Add several options:
* "--uaIphone" spoofing user agent as iPhone under chrome browser
* "--uaGalaxy" spoofing user agent as Samsung Galaxy under chrome browser
* "--timeout" default timeout can be overwrite [20000ms]

## [1.0.8] - 2018-02-12

### Published

* Published to npm
