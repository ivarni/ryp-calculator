import Immutable from 'immutable';

import * as actions from '../actions';

/* eslint-disable new-cap */
export const UserRecord = Immutable.Record({
    name: null,
    token: null,
});
/* eslint-enable new-cap */

export const defaultUser = new UserRecord({
    name: 'Anonym',
    token: null,
});

const setUserData = (state, { name, token }) => {
    const newData = {};
    if (name) {
        newData.name = name;
    }
    if (token) {
        newData.token = token;
    }
    return state.merge(newData);
};

export default (state = defaultUser, action) => {
    switch (action.type) {
        case actions.SET_USER_DATA:
            return setUserData(state, action);
        default:
            return state;
    }
};
