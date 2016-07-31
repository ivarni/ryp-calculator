import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import api from '~/middleware/api';
import rootReducer from '~/reducers';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import DevTools from '~/containers/DevTools';


export default function configureStore(preloadedState) {
    const store = createStore(
        combineReducers({
            app: rootReducer,
            form: formReducer,
            routing: routerReducer,
        }),
        preloadedState,
        compose(
            applyMiddleware(
                thunk,
//                api,
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
