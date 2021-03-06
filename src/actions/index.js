export const FIELD_CHANGE = 'FIELD_CHANGE';
export const fieldChange = (field, value) => (
    {
        type: FIELD_CHANGE,
        field,
        value,
    }
);

export const LABEL_CHANGE = 'LABEL_CHANGE';
export const labelChange = (field, value, notes) => (
    {
        type: LABEL_CHANGE,
        field,
        value,
        notes,
    }
);

export const EXERCISE_FINISHED = 'EXERCISE_FINISHED';
export const exerciseFinished = (day, name) => (
    {
        type: EXERCISE_FINISHED,
        day,
        name,
    }
);

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const addExercise = (label, value, notes) => (
    {
        type: ADD_EXERCISE,
        label,
        value,
        notes,
    }
);

export const EXERCISES_UPDATED = 'EXERCISES_UPDATED';
export const exercisesUpdated = exercises => (
    {
        type: EXERCISES_UPDATED,
        exercises,
    }
);

export const HYDRATE_STORE = 'HYDRATE_STORE';
export const hydrateStore = preloadedState => (
    {
        type: HYDRATE_STORE,
        preloadedState,
    }
);

export const SET_USER_DATA = 'SET_USER_DATA';
export const setUserData = (name, token) => (
    {
        type: SET_USER_DATA,
        name,
        token,
    }
);
