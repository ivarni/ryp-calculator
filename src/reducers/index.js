import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import exercises from './exercises';
import days from './days';
import user from './user';

const rootReducer = combineReducers({
    exercises,
    days,
    user,
    routing,
});

export default rootReducer;
