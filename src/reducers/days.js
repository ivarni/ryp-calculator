import Immutable from 'immutable';

import * as actions from '../actions';
import { defaultExercises } from './exercises';
import formulas from '../formula';

const days = [];
for (let i = 0, l = 18; i < l; i++) {
    days[i] = i + 1;
}

let customCounter = 1;

export const defaultDays = Immutable.List.of(...days.map((day) => {
    const formula = formulas[day - 1];
    return defaultExercises.map(exercise => exercise.merge({
        title: formula.title,
        value: (exercise.value * formula.multiplier).toFixed(1),
        sets: formula.sets[exercise.name],
    }));
}));

const updateExerciseValue = (state, action) =>
    state.map((day, i) => {
        const formula = formulas[i];
        return day.map((exercise) => {
            if (exercise.name === action.field) {
                return exercise.merge({
                    title: formula.title,
                    value: (action.value * formula.multiplier).toFixed(1),
                    sets: formula.sets[exercise.name],
                });
            }
            return exercise;
        });
    });

const updateExerciseLabel = (state, action) =>
    state.map(day =>
        day.map((exercise) => {
            if (exercise.name === action.field) {
                return exercise.merge({
                    label: action.value,
                    notes: action.notes,
                });
            }
            return exercise;
        })
    );

const exerciseFinished = (state, action) =>
    state.map((day, index) => {
        if (action.day === index) {
            return day.map((exercise) => {
                if (exercise.name === action.name) {
                    return exercise.set('finished', true);
                }
                return exercise;
            });
        }
        return day;
    });

const addExercise = (state, { label, value, notes }) => {
    const name = `custom_${customCounter++}`;

    return state.map((day, idx) => {
        const formula = formulas[idx];

        return day.concat({
            name,
            notes,
            label,
            value: (value * formula.multiplier).toFixed(1),
            finished: false,
        });
    });
};

const updateDays = (state, action) =>
    state.map((day, dayIdx) => {
        const formula = formulas[dayIdx];
        return action.exercises.map((exercise, exerciseIdx) =>
            exercise.merge({
                value: (exercise.value * formula.multiplier).toFixed(1),
                finished: (day.get(exerciseIdx) || {}).finished,
            })
        );
    });

export default (state = defaultDays, action) => {
    switch (action.type) {
        case actions.FIELD_CHANGE:
            return updateExerciseValue(state, action);
        case actions.LABEL_CHANGE:
            return updateExerciseLabel(state, action);
        case actions.EXERCISE_FINISHED:
            return exerciseFinished(state, action);
        case actions.ADD_EXERCISE:
            return addExercise(state, action);
        case actions.EXERCISES_UPDATED:
            return updateDays(state, action);
        default:
            return state;
    }
};
