import reducer, { defaultExercises } from '../../src/reducers/exercises';
import { fieldChange, labelChange } from '../../src/actions';

describe('exercises reducer', () => {

    it('returns the default state', () => {
        const action = { type: 'UNKNOWN' };

        const state = reducer(undefined, action);

        expect(state).to.eql(defaultExercises);
    });

    describe('when updating', () => {
        it('updates the value of a specified exercise', () => {
            const action = fieldChange('squats', 42);
            const nextState = reducer(defaultExercises, action);

            const squats = nextState.find(e => e.name === 'squats');
            const benchpress = nextState.find(e => e.name === 'benchpress');
            const defaultBenchpress = defaultExercises.find(e => e.name === 'benchpress');

            expect(squats.value).to.be(42);
            expect(benchpress.value).to.be(defaultBenchpress.value);
        });

        it('updates label and notes of a specified exercise', () => {
            const action = labelChange('row', 'Stående roing', 'Stang');
            const nextState = reducer(defaultExercises, action);

            const row = nextState.find(e => e.name === 'row');
            const squats = nextState.find(e => e.name === 'squats');

            expect(row.label).to.equal('Stående roing');
            expect(row.notes).to.equal('Stang');
            expect(squats.label).to.equal('Knebøy');
            expect(squats.notes).to.equal('');
        });
    });
});
