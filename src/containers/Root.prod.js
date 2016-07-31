import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '~/routes';
import { Router } from 'react-router';

export default function Root(props) {
    const { store, history } = props;

    return (
        <Provider store={store}>
            <Router
              history={history}
              routes={routes}
            />
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};
