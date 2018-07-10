'use strict';

var _cucumber = require('cucumber');

var _checkClass = require('../support/check/checkClass');

var _checkClass2 = _interopRequireDefault(_checkClass);

var _checkContainsAnyText = require('../support/check/checkContainsAnyText');

var _checkContainsAnyText2 = _interopRequireDefault(_checkContainsAnyText);

var _checkIsEmpty = require('../support/check/checkIsEmpty');

var _checkIsEmpty2 = _interopRequireDefault(_checkIsEmpty);

var _checkContainsText = require('../support/check/checkContainsText');

var _checkContainsText2 = _interopRequireDefault(_checkContainsText);

var _checkCookieContent = require('../support/check/checkCookieContent');

var _checkCookieContent2 = _interopRequireDefault(_checkCookieContent);

var _checkCookieExists = require('../support/check/checkCookieExists');

var _checkCookieExists2 = _interopRequireDefault(_checkCookieExists);

var _checkDimension = require('../support/check/checkDimension');

var _checkDimension2 = _interopRequireDefault(_checkDimension);

var _checkEqualsText = require('../support/check/checkEqualsText');

var _checkEqualsText2 = _interopRequireDefault(_checkEqualsText);

var _checkFocus = require('../support/check/checkFocus');

var _checkFocus2 = _interopRequireDefault(_checkFocus);

var _checkInURLPath = require('../support/check/checkInURLPath');

var _checkInURLPath2 = _interopRequireDefault(_checkInURLPath);

var _checkIsOpenedInNewWindow = require('../support/check/checkIsOpenedInNewWindow');

var _checkIsOpenedInNewWindow2 = _interopRequireDefault(_checkIsOpenedInNewWindow);

var _checkModal = require('../support/check/checkModal');

var _checkModal2 = _interopRequireDefault(_checkModal);

var _checkModalText = require('../support/check/checkModalText');

var _checkModalText2 = _interopRequireDefault(_checkModalText);

var _checkNewWindow = require('../support/check/checkNewWindow');

var _checkNewWindow2 = _interopRequireDefault(_checkNewWindow);

var _checkOffset = require('../support/check/checkOffset');

var _checkOffset2 = _interopRequireDefault(_checkOffset);

var _checkProperty = require('../support/check/checkProperty');

var _checkProperty2 = _interopRequireDefault(_checkProperty);

var _checkSelected = require('../support/check/checkSelected');

var _checkSelected2 = _interopRequireDefault(_checkSelected);

var _checkTitle = require('../support/check/checkTitle');

var _checkTitle2 = _interopRequireDefault(_checkTitle);

var _checkURL = require('../support/check/checkURL');

var _checkURL2 = _interopRequireDefault(_checkURL);

var _checkURLPath = require('../support/check/checkURLPath');

var _checkURLPath2 = _interopRequireDefault(_checkURLPath);

var _checkWithinViewport = require('../support/check/checkWithinViewport');

var _checkWithinViewport2 = _interopRequireDefault(_checkWithinViewport);

var _compareText = require('../support/check/compareText');

var _compareText2 = _interopRequireDefault(_compareText);

var _isEnabled = require('../support/check/isEnabled');

var _isEnabled2 = _interopRequireDefault(_isEnabled);

var _isExisting = require('../support/check/isExisting');

var _isExisting2 = _interopRequireDefault(_isExisting);

var _isVisible = require('../support/check/isVisible');

var _isVisible2 = _interopRequireDefault(_isVisible);

var _waitFor = require('../support/action/waitFor');

var _waitFor2 = _interopRequireDefault(_waitFor);

var _waitForVisible = require('../support/action/waitForVisible');

var _waitForVisible2 = _interopRequireDefault(_waitForVisible);

var _checkIfElementExists = require('../support/lib/checkIfElementExists');

var _checkIfElementExists2 = _interopRequireDefault(_checkIfElementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cucumber.defineSupportCode)(({ Then }) => {
    Then(/^I expect that the title is( not)* "([^"]*)?"$/, _checkTitle2.default);

    Then(/^I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times$/, _checkIfElementExists2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* visible$/, _isVisible2.default);

    Then(/^I expect that element "([^"]*)?" becomes( not)* visible$/, _waitForVisible2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* within the viewport$/, _checkWithinViewport2.default);

    Then(/^I expect that element "([^"]*)?" does( not)* exist$/, _isExisting2.default);

    Then(/^I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/, _compareText2.default);

    Then(/^I expect that (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/, _checkEqualsText2.default);

    Then(/^I expect that (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"$/, _checkContainsText2.default);

    Then(/^I expect that (button|element) "([^"]*)?"( not)* contains any text$/, _checkContainsAnyText2.default);

    Then(/^I expect that (button|element) "([^"]*)?" is( not)* empty$/, _checkIsEmpty2.default);

    Then(/^I expect that the url is( not)* "([^"]*)?"$/, _checkURL2.default);

    Then(/^I expect that the path is( not)* "([^"]*)?"$/, _checkURLPath2.default);

    Then(/^I expect the url to( not)* contain "([^"]*)?"$/, _checkInURLPath2.default);

    Then(/^I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/, _checkProperty2.default);

    Then(/^I expect that checkbox "([^"]*)?" is( not)* checked$/, _checkSelected2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* selected$/, _checkSelected2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* enabled$/, _isEnabled2.default);

    Then(/^I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"$/, _checkCookieContent2.default);

    Then(/^I expect that cookie "([^"]*)?"( not)* exists$/, _checkCookieExists2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/, _checkDimension2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/, _checkOffset2.default);

    Then(/^I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"$/, _checkClass2.default);

    Then(/^I expect a new (window|tab) has( not)* been opened$/, _checkNewWindow2.default);

    Then(/^I expect the url "([^"]*)?" is opened in a new (tab|window)$/, _checkIsOpenedInNewWindow2.default);

    Then(/^I expect that element "([^"]*)?" is( not)* focused$/, _checkFocus2.default);

    Then(/^I wait on element "([^"]*)?"(?: for (\d+)ms)*(?: to( not)* (be checked|be enabled|be selected|be visible|contain a text|contain a value|exist))*$/, {
        wrapperOptions: {
            retry: 3
        }
    }, _waitFor2.default);

    Then(/^I expect that a (alertbox|confirmbox|prompt) is( not)* opened$/, _checkModal2.default);

    Then(/^I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/, _checkModalText2.default);
});