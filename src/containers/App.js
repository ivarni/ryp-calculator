import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import '~/styles/styles.less';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }

}

App.propTypes = {
    children: PropTypes.node,
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {

})(App);
