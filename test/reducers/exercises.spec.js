import reducer, { defaultExercises } from '../../src/reducers/exercises';
import {
    addExercise,
    fieldChange,
    hydrateStore,
    labelChange,
} from '../../src/actions';

import preloadedState from '../fixtures/preloadedState.json';

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

        it('does not touch the exercise title', () => {
            const action = fieldChange('squats', 42);
            const defaultWithTitles = defaultExercises.map(d => d.merge({
                title: 'Should find another place to keep this',
            }));
            const state = reducer(defaultWithTitles, action);

            const squats = state.find(e => e.name === 'squats');

            expect(squats.value).to.be(42);
            expect(squats.title).to.be('Should find another place to keep this');
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
            const action1 = addExercise('Markløft', 70, 'stang');
            const action2 = addExercise('Benkpress', 60, 'stang');

            const state1 = reducer(undefined, action1);
            const state2 = reducer(state1, action2);

            const unique = new Set(state2.map(s => s.name));

            expect(unique.size).to.equal(state2.size);
        });
    });

    describe('When hydrating the store', () => {
        it('updates the state', () => {
            const action = hydrateStore(preloadedState);

            const state = reducer(defaultExercises, action);

            preloadedState.exercises.forEach((newExercise) => {
                const exercise = state.find(e => e.name === newExercise.name);

                expect(exercise.value).to.be(newExercise.value);
                expect(exercise.name).to.be(newExercise.name);
                expect(exercise.notes).to.be(newExercise.notes);
                expect(exercise.label).to.be(newExercise.label);
                expect(exercise.finished).to.be(newExercise.finished);
            });
        });
    });
});
