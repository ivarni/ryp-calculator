import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';

class RypField extends Component {

    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
        this.state = {
            editing: false,
        };
    }

    onEdit(e) {
        e.preventDefault();
        this.setState({
            editing: !this.state.editing,
        });
    }

    render() {
        const {
            fieldName,
            fieldLabel,
        } = this.props;

        const { editing } = this.state;

        return (
            <div className="ryp-field">
                { editing &&
                    <Field
                        name={`${fieldName}-edit`}
                        component="input"
                        type="text"
                        defaultValue={fieldLabel}
                    />
                }
                { !editing &&
                    <label htmlFor={fieldName}>
                        {fieldLabel}
                    </label>
                }
                <a href="">
                    <svg
                        fill="#000000"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={this.onEdit}
                    >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </a>
                <Field
                    name={fieldName}
                    component="input"
                    type="tel"
                />
            </div>
        );
    }

}

export default RypField;
