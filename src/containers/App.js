import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import '~/styles/styles.less';

function App(props) {
    const { children } = props;

    return (
        <MuiThemeProvider>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/ryp">Ryp</Link>
                        </li>
                    </ul>
                </nav>
                {children}
            </div>
        </MuiThemeProvider>
    );
}

App.propTypes = {
    children: PropTypes.node,
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {

})(App);
