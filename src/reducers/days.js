import * as actions from '../actions';
import { defaultExercises } from './exercises';
import formulas from '../formula';

const days = [];
for (let i = 0, l = 18; i < l; i++) {
    days[i] = i + 1;
}

const defaultDays = days.map(day => {
    const formula = formulas[day - 1];
    return defaultExercises.map(exercise => ({
        ...exercise,
        title: formula.title,
        value: (exercise.value * formula.multiplier).toFixed(1),
        sets: formula.sets[exercise.name],
    }));
});

const updateExerciseValue = (state, action) => {
    return days.map(day => {
        const formula = formulas[day - 1];
        return defaultExercises.map(exercise => {
            let value = exercise.value;
            if (exercise.name === action.field) {
                value = action.value;
            }
            return {
                ...exercise,
                title: formula.title,
                value: (value * formula.multiplier).toFixed(1),
                sets: formula.sets[exercise.name],
            };
        });
    });
}

const updateExerciseLabel = (state, action) => {
    return days.map(day => {
        const formula = formulas[day - 1];
        return defaultExercises.map(exercise => {
            let { label, notes } = exercise;
            if (exercise.name === action.field) {
                label = action.value;
                notes = action.notes;
            }
            return {
                ...exercise,
                notes,
                label,
                value: (exercise.value * formula.multiplier).toFixed(1),
                sets: formula.sets[exercise.name],
            };
        });
    })
}

const exerciseFinished = (state, action) => {
    return state.map((day, index) => {
        if (action.day === index) {
            day = day.map(exercise => {
                if (exercise.name === action.name) {
                    exercise.finished = true;
                }
                return exercise;
            })
        }
        return day;
    })
}

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
