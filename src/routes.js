import React from 'react';
import { Route } from 'react-router';

import App from '~/containers/App';
import RypPage from '~/containers/RypPage';

export default (
    <Route path="/" component={App}>
        <Route path="/ryp" component={RypPage} />
    </Route>
);
