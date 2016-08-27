import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import exercises from './exercises';
import days from './days';

const rootReducer = combineReducers({
    exercises,
    days,
    routing,
});

export default rootReducer;
