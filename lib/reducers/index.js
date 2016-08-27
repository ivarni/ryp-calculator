'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _exercises = require('./exercises');

var _exercises2 = _interopRequireDefault(_exercises);

var _days = require('./days');

var _days2 = _interopRequireDefault(_days);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    exercises: _exercises2.default,
    days: _days2.default,
    routing: _reactRouterRedux.routerReducer
});

exports.default = rootReducer;