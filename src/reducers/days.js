import * as actions from '../actions';
import { defaultExercises } from './exercises';
import formulas from '../formula';

const days = [];
for (let i = 0, l = 18; i < l; i++) {
    days[i] = i + 1;
}

export const defaultDays = days.map(day => {
    const formula = formulas[day - 1];
    return defaultExercises.map(exercise => ({
        ...exercise,
        title: formula.title,
        value: (exercise.value * formula.multiplier).toFixed(1),
        sets: formula.sets[exercise.name],
    }));
});

const updateExerciseValue = (state, action) =>
    state.map((day, i) => {
        const formula = formulas[i];
        return day.map(exercise => {
            if (exercise.name === action.field) {
                return {
                    ...exercise,
                    title: formula.title,
                    value: (action.value * formula.multiplier).toFixed(1),
                    sets: formula.sets[exercise.name],
                };
            }
            return exercise;
        });
    });

const updateExerciseLabel = (state, action) =>
    state.map(day =>
        day.map(exercise => {
            if (exercise.name === action.field) {
                return {
                    ...exercise,
                    notes: action.notes,
                    label: action.value,
                };
            }
            return exercise;
        })
    );

const exerciseFinished = (state, action) =>
    state.map((day, index) => {
        if (action.day === index) {
            return day.map(exercise => {
                const newExercise = { ...exercise };
                if (exercise.name === action.name) {
                    newExercise.finished = true;
                }
                return newExercise;
            });
        }
        return day;
    });

export default (state = defaultDays, action) => {
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
