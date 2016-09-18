'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

var _exercises = require('./exercises');

var _formula = require('../formula');

var _formula2 = _interopRequireDefault(_formula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var days = [];
for (var i = 0, l = 18; i < l; i++) {
    days[i] = i + 1;
}

var defaultDays = days.map(function (day) {
    var formula = _formula2.default[day - 1];
    return _exercises.defaultExercises.map(function (exercise) {
        return _extends({}, exercise, {
            title: formula.title,
            value: (exercise.value * formula.multiplier).toFixed(1),
            sets: formula.sets[exercise.name]
        });
    });
});

var updateExerciseValue = function updateExerciseValue(state, action) {
    return state.map(function (day, i) {
        var formula = _formula2.default[i];
        return day.map(function (exercise) {
            if (exercise.name === action.field) {
                return _extends({}, exercise, {
                    title: formula.title,
                    value: (action.value * formula.multiplier).toFixed(1),
                    sets: formula.sets[exercise.name]
                });
            }
            return exercise;
        });
    });
};

var updateExerciseLabel = function updateExerciseLabel(state, action) {
    return state.map(function (day, i) {
        var formula = _formula2.default[i];
        return day.map(function (exercise) {
            var label = exercise.label;
            var notes = exercise.notes;

            if (exercise.name === action.field) {
                label = action.value;
                notes = action.notes;
                return _extends({}, exercise, {
                    notes: action.notes,
                    label: action.value
                });
            }
            return exercise;
        });
    });
};

var exerciseFinished = function exerciseFinished(state, action) {
    return state.map(function (day, index) {
        var newDay = void 0;
        if (action.day === index) {
            newDay = day.map(function (exercise) {
                var newExercise = _extends({}, exercise);
                if (exercise.name === action.name) {
                    newExercise.finished = true;
                }
                return newExercise;
            });
        }
        return newDay;
    });
};

exports.default = function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultDays : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case actions.FIELD_CHANGE:
            return updateExerciseValue(state, action);
        case actions.LABEL_CHANGE:
            return updateExerciseLabel(state, action);
        case actions.EXERCISE_FINISHED:
            return exerciseFinished(state, action);
        default:
            return state;
    }
};