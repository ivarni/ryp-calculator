import Immutable from 'immutable';

import * as actions from '../actions';

/* eslint-disable new-cap */
export const ExerciseRecord = Immutable.Record({
    name: null,
    notes: null,
    label: null,
    title: null,
    value: 0,
    finished: false,
    sets: {},
});
/* eslint-enable new-cap */

export const defaultExercises = Immutable.List.of(
    new ExerciseRecord({
        name: 'squats',
        notes: '',
        label: 'Knebøy',
        value: 70,
        finished: false,
    }),
    new ExerciseRecord({
        name: 'benchpress',
        notes: '',
        label: 'Skråbenk, manualer',
        value: 22.5,
        finished: false,
    }),
    new ExerciseRecord({
        name: 'row',
        notes: '',
        label: 'Nedtrekk',
        value: 50,
        finished: false,
    }),
    new ExerciseRecord({
        name: 'arnold',
        notes: '',
        label: 'Arnoldpress',
        value: 15,
        finished: false,
    }),
    new ExerciseRecord({
        name: 'biceps',
        notes: '',
        label: 'Bicepscurl',
        value: 12.5,
        finished: false,
    }),
    new ExerciseRecord({
        name: 'triceps',
        notes: 'Over hodet',
        label: 'Tricepspress',
        value: 30,
        finished: false,
    }),
    new ExerciseRecord({
        name: 'abs',
        notes: '',
        label: 'Mage',
        value: 30,
        finished: false,
    }),
);

let customCounter = 1;

const updateExerciseValue = (state, { field, value }) =>
    state.map((exercise) => {
        if (exercise.name === field) {
            return exercise.set('value', value);
        }
        return exercise;
    });

const updateExerciseLabel = (state, { field, value, notes }) =>
    state.map((exercise) => {
        if (exercise.name === field) {
            return exercise.merge({
                label: value,
                notes,
            });
        }
        return exercise;
    });

const addExercise = (state, { label, value, notes }) =>
    state.push(new ExerciseRecord({
        name: `custom_${customCounter++}`,
        notes,
        label,
        value,
        finished: false,
    }));

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
