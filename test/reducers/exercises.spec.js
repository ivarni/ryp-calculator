import reducer, { defaultExercises } from '../../src/reducers/exercises';
import {
    addExercise,
    fieldChange,
    labelChange,
} from '../../src/actions';

describe('exercises reducer', () => {

    it('returns the default state', () => {
        const action = { type: 'UNKNOWN' };
        const state = reducer(undefined, action);

        expect(state).to.eql(defaultExercises);
    });

    describe('when updating', () => {
        it('updates the value of a specified exercise', () => {
            const action = fieldChange('squats', 42);
            const state = reducer(defaultExercises, action);

            const squats = state.find(e => e.name === 'squats');
            const benchpress = state.find(e => e.name === 'benchpress');
            const defaultBenchpress = defaultExercises.find(e => e.name === 'benchpress');

            expect(squats.value).to.be(42);
            expect(benchpress.value).to.be(defaultBenchpress.value);
        });

        it('updates label and notes of a specified exercise', () => {
            const action = labelChange('row', 'Stående roing', 'Stang');
            const state = reducer(defaultExercises, action);

            const row = state.find(e => e.name === 'row');
            const squats = state.find(e => e.name === 'squats');

            expect(row.label).to.equal('Stående roing');
            expect(row.notes).to.equal('Stang');
            expect(squats.label).to.equal('Knebøy');
            expect(squats.notes).to.equal('');
        });
    });

    describe('When adding exercises', () => {
        it('adds the new exercise to the list', () => {
            const action = addExercise('Markløft', 70, 'stang');
            const state = reducer(undefined, action);

            const deadlift = state.find(e => e.name === 'custom_1');

            expect(deadlift).to.be.an('object');
            expect(deadlift.label).to.equal('Markløft');
            expect(deadlift.value).to.equal(70);
            expect(deadlift.notes).to.equal('stang');
            expect(deadlift.finished).to.be(false);
        });

        it('gives each exercise a unique name', () => {
            const action_1 = addExercise('Markløft', 70, 'stang');
            const action_2 = addExercise('Benkpress', 60, 'stang');

            const state_1 = reducer(undefined, action_1);
            const state_2 = reducer(state_1, action_2);

            const unique = new Set(state_2.map(s => s.name));

            expect(unique.size).to.equal(state_2.length);
        });
    });
});
