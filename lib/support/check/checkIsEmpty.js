'use strict';

var _checkContainsAnyText = require('./checkContainsAnyText');

var _checkContainsAnyText2 = _interopRequireDefault(_checkContainsAnyText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (elementType, element, falseCase) {
    var newFalseCase = true;

    if (typeof falseCase === 'function') {
        newFalseCase = false;
    } else if (falseCase === ' not') {
        newFalseCase = false;
    }

    (0, _checkContainsAnyText2.default)(elementType, element, newFalseCase);
};