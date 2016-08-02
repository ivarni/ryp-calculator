import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import formula from '~/formula';

class RypResult extends Component {

    renderDay(day) {
        return (
            <p>{day.title || 'blah'}</p>
        );
    }

    render() {
        const { days } = this.props;

        return (
            <div>
                {days.map(this.renderDay)}
            </div>
        );
    }
}

RypResult.propTypes = {

};
/*
- Separate expanded state from exercise
- Days *are* derived data, should not be in state
- Notes should not trigger recalculate
- Nor should label (ideally)
- So it follows.. use normalizr?
- No, compose selectors with one that just picks out the exercise value
*/
debugger;

const getExercises = state => state.app.exercises;
const getFormula = (state, day) => formula[day];

const getDayExercise = createSelector(
    [ getExercises, getFormula ],
    (exercise, formula) => {
        console.log('selecting')
        return { title: 'hurray'};
    }
)

function mapStateToProps(state) {
    const days = Array(2).fill({}).map((e,i) => {
        return getDayExercise(state, i + 1);
    });
    return { days };
}

export default connect(mapStateToProps, {

})(RypResult);
