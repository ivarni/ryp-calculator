import * as actions from '../actions';

export const expandChange = field =>
    dispatch => dispatch(actions.expandChange(field));

export const fieldChange = (field, value) =>
    dispatch => dispatch(actions.fieldChange(field, value));

export const labelChange = (field, value, notes) =>
    dispatch => dispatch(actions.labelChange(field, value, notes));

export const onFinished = (day, name) =>
    dispatch => dispatch(actions.exerciseFinished(day, name));
