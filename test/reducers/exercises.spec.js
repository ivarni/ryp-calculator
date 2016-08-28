import test from 'tape';

import reducer, { defaultExercises } from '../../src/reducers/exercises';
import { fieldChange, labelChange } from '../../src/actions';

test('Given no state, the default state is returned', assert => {
    assert.plan(1);

    const action = { type: 'UNKNOWN' };

    assert.equal(
        reducer(undefined, action),
        defaultExercises
    );
});

test('An unknown action does not alter state', assert => {
    assert.plan(1);

    const action = { type: 'UNKNOWN' };

    assert.equal(
        reducer(defaultExercises, action),
        defaultExercises
    );
});

test('Updates the value of a specified exercise', assert => {
    assert.plan(2);

    const action = fieldChange('squats', 42);
    const nextState = reducer(defaultExercises, action);

    const specified = nextState.find(e => e.name === 'squats');
    const unSpecified = nextState.find(e => e.name !== 'squats');

    assert.equal(
        specified.value,
        42
    );

    assert.equal(
        unSpecified.value,
        100
    );
});

test('Updates label and notes of a specified exercise', assert => {
    assert.plan(2);

    const action = labelChange('row', 'Stående roing', 'Stang');
    const nextState = reducer(defaultExercises, action);

    const specified = nextState.find(e => e.name === 'row');
    const unSpecified = nextState.find(e => e.name !== 'row');

    assert.equal(
        specified.label,
        'Stående roing'
    );

    assert.equal(
        specified.notes,
        'Stang'
    );
});



