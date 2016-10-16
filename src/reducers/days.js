import Immutable from 'immutable';

import * as actions from '../actions';
import { defaultExercises } from './exercises';
import formulas from '../formula';

const days = [];
for (let i = 0, l = 18; i < l; i++) {
    days[i] = i + 1;
}

export const defaultDays = Immutable.List.of(...days.map((day) => {
    const formula = formulas[day - 1];
    return defaultExercises.map(exercise => exercise.merge({
        title: formula.title,
        value: (exercise.value * formula.multiplier).toFixed(1),
        sets: formula.sets[exercise.name],
    }));
}));

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
        case actions.EXERCISE_FINISHED:
            return exerciseFinished(state, action);
        case actions.EXERCISES_UPDATED:
            return updateDays(state, action);
        default:
            return state;
    }
};
