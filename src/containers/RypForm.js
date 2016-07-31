import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RypField from '~/components/RypField';

import {
    expandChange,
    fieldChange,
    fieldEdit,
    labelChange,
    labelEdit,
} from '~/dispatchers';

class RypForm extends Component {

    constructor() {
        super();
        this.onExpandChange = this.onExpandChange.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.renderField = this.renderField.bind(this);
    }

    onExpandChange(field) {
        this.props.expandChange(field);
    }

    onValueChange(field, value) {
        this.props.fieldChange(field, Number(value));
    }

    onLabelChange(field, value, notes) {
        this.props.labelChange(field, value, notes);
    }

    renderField(key) {
        const exercise = this.props.exercises[key];

        return (
            <RypField
              editLabel={this.onEditLabel}
              editValue={this.onEditValue}
              expanded={exercise.expanded}
              fieldName={key}
              fieldLabel={exercise.label}
              fieldValue={exercise.value}
              key={key}
              onExpandChange={this.onExpandChange}
              onValueChange={this.onValueChange}
              onLabelChange={this.onLabelChange}
              notes={exercise.notes}
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
    expandChange: PropTypes.func.isRequired,
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
    expandChange,
    fieldChange,
    fieldEdit,
    labelChange,
    labelEdit,
})(RypForm);
