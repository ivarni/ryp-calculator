import * as actions from '~/actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const defaultExercises = {
    squats: {
        expanded: false,
        label: 'Knebøy',
        value: 0,
    },
    benchpress: {
        expanded: false,
        label: 'Skråbenk, manualer',
        value: 0,
    },
    row: {
        expanded: false,
        label: 'Roing, bredt grep',
        value: 0,
    },
    arnold: {
        expanded: false,
        label: 'Arnoldpress',
        value: 0,
    },
    biceps: {
        expanded: false,
        label: 'Bicepscurl',
        value: 0,
    },
    triceps: {
        expanded: false,
        label: 'Tricepspress',
        value: 0,
    },
    abs: {
        expanded: false,
        label: 'Mage',
        value: 0,
    },
};

const expandChange = (state, action) => {
    const nextState = { ...state };
    Object.keys(nextState).forEach(key => {
        if (key === action.field) {
            nextState[key].expanded = !nextState[key].expanded;
        } else {
            nextState[key].expanded = false;
        }
    });
    return nextState;
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
        case actions.EXPAND_CHANGE:
            return expandChange(state, action);
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
