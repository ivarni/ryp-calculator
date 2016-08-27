'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultExercises = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultExercises = exports.defaultExercises = [{
    name: 'squats',
    notes: '',
    label: 'Knebøy',
    value: 100,
    finished: false
}, {
    name: 'benchpress',
    notes: '',
    label: 'Skråbenk, manualer',
    value: 100,
    finished: false
}, {
    name: 'row',
    notes: '',
    label: 'Roing, bredt grep',
    value: 100,
    finished: false
}, {
    name: 'arnold',
    notes: '',
    label: 'Arnoldpress',
    value: 100,
    finished: false
}, {
    name: 'biceps',
    notes: '',
    label: 'Bicepscurl',
    value: 100,
    finished: false
}, {
    name: 'triceps',
    notes: '',
    label: 'Tricepspress',
    value: 100,
    finished: false
}, {
    name: 'abs',
    notes: '',
    label: 'Mage',
    value: 100,
    finished: false
}];

var updateExerciseValue = function updateExerciseValue(state, action) {
    var nextState = Array.from(state);
    return nextState.map(function (exercise) {
        if (exercise.name === action.field) {
            return _extends({}, exercise, { value: action.value });
        }
        return exercise;
    });
};

var updateExerciseLabel = function updateExerciseLabel(state, action) {
    var nextState = Array.from(state);
    return nextState.map(function (exercise) {
        if (exercise.name === action.field) {
            return _extends({}, exercise, {
                label: action.value,
                notes: action.notes
            });
        }
        return exercise;
    });
};

exports.default = function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultExercises : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case actions.FIELD_CHANGE:
            return updateExerciseValue(state, action);
        case actions.LABEL_CHANGE:
            return updateExerciseLabel(state, action);
        default:
            return state;
    }
};