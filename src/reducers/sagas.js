import { put, take, select } from 'redux-saga/effects';

import {
    FIELD_CHANGE,
    LABEL_CHANGE,
    exercisesUpdated,
} from '../actions';

const getExercises = state => state.exercises;

/* eslint-disable no-constant-condition */
function* dispatch() {
    while (true) {
        yield take([FIELD_CHANGE, LABEL_CHANGE]);
        const exercises = yield select(getExercises);
        yield put(exercisesUpdated(exercises));
    }
}
/* eslint-enable no-constant-condition */

export default dispatch;
