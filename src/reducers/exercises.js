import * as actions from '../actions';

export const defaultExercises = [
    {
        name: 'squats',
        notes: '',
        label: 'Knebøy',
        value: 100,
        finished: false,
    },
    {
        name: 'benchpress',
        notes: '',
        label: 'Skråbenk, manualer',
        value: 100,
        finished: false,
    },
    {
        name: 'row',
        notes: '',
        label: 'Roing, bredt grep',
        value: 100,
        finished: false,
    },
    {
        name: 'arnold',
        notes: '',
        label: 'Arnoldpress',
        value: 100,
        finished: false,
    },
    {
        name: 'biceps',
        notes: '',
        label: 'Bicepscurl',
        value: 100,
        finished: false,
    },
    {
        name: 'triceps',
        notes: '',
        label: 'Tricepspress',
        value: 100,
        finished: false,
    },
    {
        name: 'abs',
        notes: '',
        label: 'Mage',
        value: 100,
        finished: false,
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

export default (state = defaultExercises, action) => {
    switch (action.type) {
        case actions.FIELD_CHANGE:
            return updateExerciseValue(state, action);
        case actions.LABEL_CHANGE:
            return updateExerciseLabel(state, action);
        default:
            return state;
    }
};
