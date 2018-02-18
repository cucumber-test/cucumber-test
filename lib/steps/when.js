'use strict';

var _cucumber = require('cucumber');

var _clearInputField = require('../support/action/clearInputField');

var _clearInputField2 = _interopRequireDefault(_clearInputField);

var _clickElement = require('../support/action/clickElement');

var _clickElement2 = _interopRequireDefault(_clickElement);

var _closeLastOpenedWindow = require('../support/action/closeLastOpenedWindow');

var _closeLastOpenedWindow2 = _interopRequireDefault(_closeLastOpenedWindow);

var _deleteCookie = require('../support/action/deleteCookie');

var _deleteCookie2 = _interopRequireDefault(_deleteCookie);

var _dragElement = require('../support/action/dragElement');

var _dragElement2 = _interopRequireDefault(_dragElement);

var _focusLastOpenedWindow = require('../support/action/focusLastOpenedWindow');

var _focusLastOpenedWindow2 = _interopRequireDefault(_focusLastOpenedWindow);

var _handleModal = require('../support/action/handleModal');

var _handleModal2 = _interopRequireDefault(_handleModal);

var _moveToElement = require('../support/action/moveToElement');

var _moveToElement2 = _interopRequireDefault(_moveToElement);

var _pause = require('../support/action/pause');

var _pause2 = _interopRequireDefault(_pause);

var _pressButton = require('../support/action/pressButton');

var _pressButton2 = _interopRequireDefault(_pressButton);

var _scroll = require('../support/action/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _selectOption = require('../support/action/selectOption');

var _selectOption2 = _interopRequireDefault(_selectOption);

var _selectOptionByIndex = require('../support/action/selectOptionByIndex');

var _selectOptionByIndex2 = _interopRequireDefault(_selectOptionByIndex);

var _setCookie = require('../support/action/setCookie');

var _setCookie2 = _interopRequireDefault(_setCookie);

var _setInputField = require('../support/action/setInputField');

var _setInputField2 = _interopRequireDefault(_setInputField);

var _setPromptText = require('../support/action/setPromptText');

var _setPromptText2 = _interopRequireDefault(_setPromptText);

var _submitForm = require('../support/action/submitForm');

var _submitForm2 = _interopRequireDefault(_submitForm);

var _switchToTab = require('../support/action2/switchToTab');

var _switchToTab2 = _interopRequireDefault(_switchToTab);

var _switchToIframe = require('../support/action2/switchToIframe');

var _switchToIframe2 = _interopRequireDefault(_switchToIframe);

var _changeViewPort = require('../support/action2/changeViewPort');

var _changeViewPort2 = _interopRequireDefault(_changeViewPort);

var _switchToParent = require('../support/action2/switchToParent');

var _switchToParent2 = _interopRequireDefault(_switchToParent);

var _switchToPopup = require('../support/action2/switchToPopup');

var _switchToPopup2 = _interopRequireDefault(_switchToPopup);

var _switchToMain = require('../support/action2/switchToMain');

var _switchToMain2 = _interopRequireDefault(_switchToMain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cucumber.defineSupportCode)(function (_ref) {
    var When = _ref.When;

    When(/^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/, _clickElement2.default);

    When(/^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/, _setInputField2.default);

    When(/^I clear the inputfield "([^"]*)?"$/, _clearInputField2.default);

    When(/^I drag element "([^"]*)?" to element "([^"]*)?"$/, _dragElement2.default);

    When(/^I submit the form "([^"]*)?"$/, _submitForm2.default);

    When(/^I pause for (\d+)ms$/, _pause2.default);

    When(/^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/, _setCookie2.default);

    When(/^I delete the cookie "([^"]*)?"$/, _deleteCookie2.default);

    When(/^I press "([^"]*)?"$/, _pressButton2.default);

    When(/^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/, _handleModal2.default);

    When(/^I enter "([^"]*)?" into the prompt$/, _setPromptText2.default);

    When(/^I scroll to element "([^"]*)?"$/, _scroll2.default);

    When(/^I close the last opened (window|tab)$/, _closeLastOpenedWindow2.default);

    When(/^I focus the last opened (window|tab)$/, _focusLastOpenedWindow2.default);

    When(/^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/, _selectOptionByIndex2.default);

    When(/^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/, _selectOption2.default);

    When(/^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/, _moveToElement2.default);

    When(/^I switch to popup$/, _switchToPopup2.default);

    When(/^I switch to iframe "([^"]*)?"$/, _switchToIframe2.default);

    When(/^I change viewport to (\d+) (\d+)$/, _changeViewPort2.default);

    When(/^I switch back to parent window$/, _switchToParent2.default);

    When(/^I switch back to main window$/, _switchToMain2.default);

    When(/^I switch to tab$/, _switchToTab2.default);
});