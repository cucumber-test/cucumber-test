'use strict';

var _cucumber = require('cucumber');

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

var _checkElementExists = require('../support/check/checkElementExists');

var _checkElementExists2 = _interopRequireDefault(_checkElementExists);

var _checkEqualsText = require('../support/check/checkEqualsText');

var _checkEqualsText2 = _interopRequireDefault(_checkEqualsText);

var _checkModal = require('../support/check/checkModal');

var _checkModal2 = _interopRequireDefault(_checkModal);

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

var _closeAllButFirstTab = require('../support/action/closeAllButFirstTab');

var _closeAllButFirstTab2 = _interopRequireDefault(_closeAllButFirstTab);

var _compareText = require('../support/check/compareText');

var _compareText2 = _interopRequireDefault(_compareText);

var _isEnabled = require('../support/check/isEnabled');

var _isEnabled2 = _interopRequireDefault(_isEnabled);

var _isVisible = require('../support/check/isVisible');

var _isVisible2 = _interopRequireDefault(_isVisible);

var _openWebsite = require('../support/action/openWebsite');

var _openWebsite2 = _interopRequireDefault(_openWebsite);

var _resizeScreenSize = require('../support/action/resizeScreenSize');

var _resizeScreenSize2 = _interopRequireDefault(_resizeScreenSize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cucumber.defineSupportCode)(({ Given }) => {
    Given(/^I open the (url|site) "([^"]*)?"$/, _openWebsite2.default);

    Given(/^the element "([^"]*)?" is( not)* visible$/, _isVisible2.default);

    Given(/^the element "([^"]*)?" is( not)* enabled$/, _isEnabled2.default);

    Given(/^the element "([^"]*)?" is( not)* selected$/, _checkSelected2.default);

    Given(/^the checkbox "([^"]*)?" is( not)* checked$/, _checkSelected2.default);

    Given(/^there is (an|no) element "([^"]*)?" on the page$/, _checkElementExists2.default);

    Given(/^the title is( not)* "([^"]*)?"$/, _checkTitle2.default);

    Given(/^the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"$/, _compareText2.default);

    Given(/^the (button|element) "([^"]*)?"( not)* matches the text "([^"]*)?"$/, _checkEqualsText2.default);

    Given(/^the (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"$/, _checkContainsText2.default);

    Given(/^the (button|element) "([^"]*)?"( not)* contains any text$/, _checkContainsAnyText2.default);

    Given(/^the (button|element) "([^"]*)?" is( not)* empty$/, _checkIsEmpty2.default);

    Given(/^the page url is( not)* "([^"]*)?"$/, _checkURL2.default);

    Given(/^the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/, _checkProperty2.default);

    Given(/^the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"$/, _checkCookieContent2.default);

    Given(/^the cookie "([^"]*)?" does( not)* exist$/, _checkCookieExists2.default);

    Given(/^the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/, _checkDimension2.default);

    Given(/^the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/, _checkOffset2.default);

    Given(/^I have a screen that is ([\d]+) by ([\d]+) pixels$/, _resizeScreenSize2.default);

    Given(/^I have closed all but the first (window|tab)$/, _closeAllButFirstTab2.default);

    Given(/^a (alertbox|confirmbox|prompt) is( not)* opened$/, _checkModal2.default);
});