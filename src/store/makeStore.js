import {
    createStore,
    applyMiddleware,
} from 'redux';

import rootReducer from '../reducers';

const makeStore = (middlewares, preloadedState = {}) => {
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            ...middlewares
        )
    );
    return store;
};

export default makeStore;
