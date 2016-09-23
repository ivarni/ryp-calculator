import * as actions from '../actions';

export const defaultExercises = [
    {
        name: 'squats',
        notes: '',
        label: 'Knebøy',
        value: 70,
        finished: false,
    },
    {
        name: 'benchpress',
        notes: '',
        label: 'Skråbenk, manualer',
        value: 22.5,
        finished: false,
    },
    {
        name: 'row',
        notes: '',
        label: 'Nedtrekk',
        value: 50,
        finished: false,
    },
    {
        name: 'arnold',
        notes: '',
        label: 'Arnoldpress',
        value: 15,
        finished: false,
    },
    {
        name: 'biceps',
        notes: '',
        label: 'Bicepscurl',
        value: 12.5,
        finished: false,
    },
    {
        name: 'triceps',
        notes: 'Over hodet',
        label: 'Tricepspress',
        value: 30,
        finished: false,
    },
    {
        name: 'abs',
        notes: '',
        label: 'Mage',
        value: 30,
        finished: false,
    },
];

let customCounter = 1;

const updateExerciseValue = (state, { field, value }) =>
    state.map((exercise) => {
        if (exercise.name === field) {
            return { ...exercise, value };
        }
        return exercise;
    });

const updateExerciseLabel = (state, { field, value, notes }) =>
    state.map((exercise) => {
        if (exercise.name === field) {
            return {
                ...exercise,
                label: value,
                notes,
            };
        }
        return exercise;
    });

const addExercise = (state, { label, value, notes }) =>
    state.concat({
        name: `custom_${customCounter++}`,
        notes,
        label,
        value,
        finished: false,
    });


export default (state = defaultExercises, action) => {
    switch (action.type) {
        case actions.FIELD_CHANGE:
            return updateExerciseValue(state, action);
        case actions.LABEL_CHANGE:
            return updateExerciseLabel(state, action);
        case actions.ADD_EXERCISE:
            return addExercise(state, action);
        default:
            return state;
    }
};
