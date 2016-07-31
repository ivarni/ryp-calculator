import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RypField from '~/components/RypField';

import {
    fieldChange,
    labelChange,
} from '~/dispatchers';

class RypForm extends Component {

    constructor() {
        super();
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    onFieldChange(field, value) {
        this.props.fieldChange(field, Number(value));
    }

    onLabelChange(field, value) {
        this.props.labelChange(field, value);
    }

    renderField(key) {
        const exercise = this.props.exercises[key];

        return (
            <RypField
              key={key}
              fieldName={key}
              fieldLabel={exercise.label}
              fieldValue={exercise.value}
              onFieldChange={this.onFieldChange}
              onLabelChange={this.onLabelChange}
            />
        );
    }

    render() {
        const { exercises } = this.props;

        return (
            <form>
                {Object.keys(exercises).map(this.renderField)}
            </form>
        );
    }

}

RypForm.propTypes = {
    exercises: PropTypes.object.isRequired,
    fieldChange: PropTypes.func.isRequired,
    labelChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { app: { exercises } } = state;
    return {
        exercises,
    };
}

export default connect(mapStateToProps, {
    fieldChange,
    labelChange,
})(RypForm);
