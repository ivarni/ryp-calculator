import React, { Component, PropTypes } from 'react';

import formulas from '~/formula';

function getDay(day, exercises) {
    const formula = formulas[day];
    const result = {};
    Object.keys(exercises).forEach(name => {
        result[name] = {};
        Object.keys(exercises[name]).forEach(key => {
            result[name] = { ...exercises[name]};
            result[name].value *= formula.multiplier;
            result[name].sets = formula.sets[name];
        });
    });
    return { ...result, title: formula.reps };
}

class RypDay extends Component {

    render() {
        const { day, exercises } = this.props;

        const result = getDay(day, exercises);

        return (
            <pre>{JSON.stringify(result, null ,2)}</pre>
        );
    }

}

export default RypDay;
