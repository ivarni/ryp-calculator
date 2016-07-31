import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RypField from '~/components/RypField';

class RypForm extends Component {

    render() {
        return (
            <form>
                <RypField
                    fieldName="squats"
                    fieldLabel="Knebøy"
                />
            </form>
        );
    }

}

function mapStateToProps(state) {
    console.log(state.form.rypForm);
}

export default connect(reduxForm({
    form: 'rypForm',
}))(RypForm);
