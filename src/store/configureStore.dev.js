import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import saga from '../reducers/sagas';
import makeStore from './makeStore';

export const sagaMiddleware = createSagaMiddleware();

export const middlewares = [
    thunk,
    sagaMiddleware,
    createLogger(),
];

export default function configureStore(preloadedState) {
    const store = makeStore(middlewares, preloadedState);
    sagaMiddleware.run(saga);

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
