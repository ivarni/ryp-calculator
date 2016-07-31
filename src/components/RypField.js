import React, { Component, PropTypes } from 'react';

class RypField extends Component {

    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
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

    onFieldChange(e) {
        const {
            target: { name, value },
        } = e;
        this.props.onFieldChange(name, value);
    }

    onLabelChange(e) {
        const {
            target: { name, value },
        } = e;
        this.props.onLabelChange(name.substring(0, name.length - 5), value);
    }

    render() {
        const {
            fieldName,
            fieldLabel,
            fieldValue,
        } = this.props;

        const { editing } = this.state;

        return (
            <div className="ryp-field">
                {editing &&
                    <input
                      name={`${fieldName}-edit`}
                      onChange={this.onLabelChange}
                      type="text"
                      value={fieldLabel}
                    />
                }
                {!editing &&
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
                        <path
                          d={`M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3
                                17.25zM20.71 7.04c.39-.39.39-1.02
                                0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41
                                0l-1.83 1.83 3.75 3.75 1.83-1.83z`}
                        />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </a>
                <input
                  name={fieldName}
                  onChange={this.onFieldChange}
                  type="tel"
                  value={fieldValue || ''}
                />
            </div>
        );
    }

}

RypField.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    fieldName: PropTypes.string.isRequired,
    fieldValue: PropTypes.number,
    onFieldChange: PropTypes.func.isRequired,
    onLabelChange: PropTypes.func.isRequired,
};

export default RypField;
