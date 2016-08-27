'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.labelChange = exports.fieldChange = exports.expandChange = undefined;

var _actions = require('/home/ivarni/work/ryp-calculator/src/actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var expandChange = exports.expandChange = function expandChange(field) {
    return function (dispatch) {
        return dispatch(actions.expandChange(field));
    };
};

var fieldChange = exports.fieldChange = function fieldChange(field, value) {
    return function (dispatch) {
        return dispatch(actions.fieldChange(field, value));
    };
};

var labelChange = exports.labelChange = function labelChange(field, value, notes) {
    return function (dispatch) {
        return dispatch(actions.labelChange(field, value, notes));
    };
};