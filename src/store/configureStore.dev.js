import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunk,
                createLogger()
            )
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            /* eslint-disable global-require */
            const nextRootReducer = require('../reducers').default;
            /* eslint-enable global-require */
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
