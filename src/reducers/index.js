import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as actions from '../actions';

const defaultExercises = [
    {
        name: 'squats',
        notes: '',
        label: 'Knebøy',
        value: 100,
    },
    {
        name: 'benchpress',
        notes: '',
        label: 'Skråbenk, manualer',
        value: 100,
    },
    {
        name: 'row',
        notes: '',
        label: 'Roing, bredt grep',
        value: 100,
    },
    {
        name: 'arnold',
        notes: '',
        label: 'Arnoldpress',
        value: 100,
    },
    {
        name: 'biceps',
        notes: '',
        label: 'Bicepscurl',
        value: 100,
    },
    {
        name: 'triceps',
        notes: '',
        label: 'Tricepspress',
        value: 100,
    },
    {
        name: 'abs',
        notes: '',
        label: 'Mage',
        value: 100,
    },
];

const updateExerciseValue = (state, action) => {
    const nextState = Array.from(state);
    return nextState.map(exercise => {
        if (exercise.name === action.field) {
            return { ...exercise, value: action.value };
        }
        return exercise;
    });
};

const updateExerciseLabel = (state, action) => {
    const nextState = Array.from(state);
    return nextState.map(exercise => {
        if (exercise.name === action.field) {
            return {
                ...exercise,
                label: action.value,
                notes: action.notes,
            };
        }
        return exercise;
    });
};

const exercises = (state = defaultExercises, action) => {
    switch (action.type) {
        case actions.FIELD_CHANGE:
            return updateExerciseValue(state, action);
        case actions.LABEL_CHANGE:
            return updateExerciseLabel(state, action);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    exercises,
    routing,
});

export default rootReducer;
