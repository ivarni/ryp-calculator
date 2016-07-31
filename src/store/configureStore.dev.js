/* eslint-disable global-require */
import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '~/reducers';
import { routerReducer } from 'react-router-redux';

import DevTools from '~/containers/DevTools';


export default function configureStore(preloadedState) {
    const store = createStore(
        combineReducers({
            app: rootReducer,
            routing: routerReducer,
        }),
        preloadedState,
        compose(
            applyMiddleware(
                thunk,
                createLogger()
            ),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
/* eslint-enable global-require */
