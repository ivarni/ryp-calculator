import reducer, { defaultDays } from '../../src/reducers/days';
import { ExerciseRecord, defaultExercises } from '../../src/reducers/exercises';
import formula from '../../src/formula';
import {
    exerciseFinished,
    exercisesUpdated,
} from '../../src/actions';

describe('days reducer', () => {
    it('returns the default state', () => {
        const action = { type: 'UNKNOWN' };
        const state = reducer(undefined, action);

        expect(state).to.eql(defaultDays);
    });

    describe('when marking as finished', () => {
        it('marks the given exercise as finished', () => {
            const action = exerciseFinished(5, 'triceps');
            const state = reducer(undefined, action);

            const exercise = state.get(5).find(
                e => e.name === 'triceps'
            );

            expect(exercise.finished).to.be(true);
        });

        it('does not mark other exercises as finished', () => {
            const action = exerciseFinished(5, 'triceps');
            const state = reducer(undefined, action);

            const exercise = state.get(4).find(
                e => e.name === 'triceps'
            );

            expect(exercise.finished).to.be(false);
        });
    });

    describe('when adding an exercise', () => {
        it('adds the new exercise', () => {
            const newExercises = defaultExercises.push(new ExerciseRecord({
                name: 'custom_1',
                notes: '',
                label: 'Utfall',
                value: 10,
                finished: false,
            }));
            const action = exercisesUpdated(newExercises);
            const state = reducer(defaultDays, action);
            const day0 = state.get(0);
            const newExercise = day0.get(day0.size - 1);
            const multiplier = formula[0].multiplier;

            expect(newExercise.name).to.equal('custom_1');
            expect(newExercise.label).to.equal('Utfall');
            expect(newExercise.value).to.be((10 * multiplier).toFixed(1));
            expect(newExercise.sets).to.be(2);
        });
    });

    describe('when updating', () => {
        it('recalculates a value', () => {
            const newExercises = defaultExercises.update(0, item => item.set('value', 100));
            const action = exercisesUpdated(newExercises);
            const state = reducer(defaultDays, action);

            const day = state.get(0);
            const exerciseDay = day.get(0);
            const multiplier = formula[0].multiplier;

            expect(exerciseDay.value).to.be((100 * multiplier).toFixed(1));
            expect(exerciseDay.sets).to.be(3);
        });

        it('sets a new label', () => {
            const newExercises = defaultExercises.update(0, item => item.set('label', 'Markløft'));
            const action = exercisesUpdated(newExercises);
            const state = reducer(defaultDays, action);

            const day = state.get(0);
            const exerciseDay = day.get(0);

            expect(exerciseDay.label).to.be('Markløft');
            expect(exerciseDay.sets).to.be(3);
        });

        it('does not unmark an exercise marked as finished', () => {
            const days = defaultDays.update(0, day =>
                day.update(0, item => item.set('finished', true))
            );
            const action = exercisesUpdated(defaultExercises);
            const state = reducer(days, action);

            const day = state.get(0);
            const exerciseDay = day.get(0);

            expect(exerciseDay.finished).to.be(true);
        });
    });
});
