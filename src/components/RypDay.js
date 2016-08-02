import React, { PropTypes } from 'react';

import formulas from '~/formula';

function getDay(day, exercises) {
    const formula = formulas[day];
    return exercises.map(exercise => ({
        ...exercise,
        value: exercise.value * formula.multiplier,
    }));
}

function RypDay(props) {
    const { day, exercises } = props;
    const result = getDay(day, exercises);

    return (
        <div>
            <pre>{JSON.stringify(result[0], null, 2)}</pre>
        </div>
    );
}

RypDay.propTypes = {
    exercises: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
};

export default RypDay;
