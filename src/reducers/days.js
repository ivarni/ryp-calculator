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
                sets: (day.get(exerciseIdx) || {}).sets || 2,
                title: formula.title,
            })
        );
    });

const hydrate = (state, { preloadedState }) =>
    Immutable.List.of(...days.map((day) => {
        const newDay = preloadedState.days[day - 1];
        return defaultExercises.map((exercise) => {
            const newExercise = newDay.find(e => e.name === exercise.name);
            return exercise.merge({
                value: newExercise.value,
                name: newExercise.name,
                notes: newExercise.notes,
                label: newExercise.label,
                finished: newExercise.finished,
                sets: newExercise.sets,
                title: newExercise.title,
            });
        });
    }));

export default (state = defaultDays, action) => {
    switch (action.type) {
        case actions.EXERCISE_FINISHED:
            return exerciseFinished(state, action);
        case actions.EXERCISES_UPDATED:
            return updateDays(state, action);
        case actions.HYDRATE_STORE:
            return hydrate(state, action);
        default:
            return state;
    }
};
