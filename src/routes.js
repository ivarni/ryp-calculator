import React from 'react';
import { Route } from 'react-router';
import App from '~/containers/App';
import RypForm from '~/containers/RypForm';

export default (
    <Route path="/" component={App}>
        <Route path="/ryp" component={RypForm} />
    </Route>
);
