import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import saga from '../reducers/sagas';
import makeStore from './makeStore';

export const sagaMiddleware = createSagaMiddleware();

export const middlewares = [
    thunk,
    sagaMiddleware,
];

export default function configureStore(preloadedState) {
    const store = makeStore(middlewares, preloadedState);
    sagaMiddleware.run(saga);
    return store;
}
