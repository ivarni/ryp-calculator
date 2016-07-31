import * as actions from '~/actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const defaultExercises = {
    squats: {
        label: 'Knebøy',
        value: 0,
    },
    benchpress: {
        label: 'Skråbenk, manualer',
        value: 0,
    },
    row: {
        label: 'Roing, bredt grep',
        value: 0,
    },
    arnold: {
        label: 'Arnoldpress',
        value: 0,
    },
    biceps: {
        label: 'Bicepscurl',
        value: 0,
    },
    triceps: {
        label: 'Tricepspress',
        value: 0,
    },
    abs: {
        label: 'Mage',
        value: 0,
    },
};

const updateExerciseValue = (state, action) => {
    const exercise = {
        [action.field]: {
            label: state[action.field].label,
            value: action.value,
        },
    };
    return { ...state, ...exercise };
};

const updateExerciseLabel = (state, action) => {
    const exercise = {
        [action.field]: {
            label: action.value,
            value: state[action.field].value,
        },
    };
    return { ...state, ...exercise };
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
