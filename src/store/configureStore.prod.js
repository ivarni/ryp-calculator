import {
    createStore,
    applyMiddleware,
    combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '~/reducers';
import { routerReducer } from 'react-router-redux';

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk)
    );
}
