import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import RypDay from '~/components/RypDay';

class RypResult extends Component {

    constructor(props) {
        super(props);
        this.renderDay = this.renderDay.bind(this);
    }

    renderDay(day, index) {
        return (
            <RypDay
                exercises={this.props.exercises}
                day={index}
            />
        );
    }

    render() {
        const { exercises } = this.props;

        return (
            <div>
                {Array(2).fill(null).map(this.renderDay)}
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
    return {
        exercises: state.app.exercises,
    };
}

export default connect(mapStateToProps, {

})(RypResult);
