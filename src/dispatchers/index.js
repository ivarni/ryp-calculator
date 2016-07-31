import * as actions from '~/actions';

export const fieldChange = (field, value) =>
    dispatch => dispatch(actions.fieldChange(field, value));


export const labelChange = (field, value) =>
    dispatch => dispatch(actions.labelChange(field, value));

