import reducer, { defaultDays } from '../../src/reducers/days';
import formula from '../../src/formula';
import {
    addExercise,
    exerciseFinished,
    fieldChange,
    labelChange,
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

            const exercise = state[5].find(
                e => e.name === 'triceps'
            );

            expect(exercise.finished).to.be(true);
        });

        it('does not mark other exercises as finished', () => {
            const action = exerciseFinished(5, 'triceps');
            const state = reducer(undefined, action);

            const exercise = state[4].find(
                e => e.name === 'triceps'
            );

            expect(exercise.finished).to.be(false);
        });
    });

    describe('when updating', () => {
        it('updates all days when a value is changed', () => {
            const action = fieldChange('arnold', 20);
            const state = reducer(undefined, action);

            const arnoldDays = state.map(day =>
                day.find(exercise => exercise.name === 'arnold')
            );

            arnoldDays.forEach((day, idx) => {
                const multiplier = formula.find(
                    f => f.day === idx + 1
                ).multiplier;

                const expectedValue = (20 * multiplier).toFixed(1);

                expect(arnoldDays[idx].value).to.be(expectedValue);
            });
        });

        it('does not update values for other exercises', () => {
            const action = fieldChange('arnold', 20);
            const state = reducer(undefined, action);

            const bicepsDays = state.map(day =>
                day.find(exercise => exercise.name === 'biceps')
            );

            bicepsDays.forEach((day, idx) => {
                const expectedValue = defaultDays[idx].find(
                    exercise => exercise.name === 'biceps'
                ).value;

                expect(bicepsDays[idx].value).to.be(expectedValue);
            });
        });

        it('updates all days when a label is changed', () => {
            const action = labelChange('abs', 'Crunch');
            const state = reducer(undefined, action);

            const absDays = state.map(day =>
                day.find(exercise => exercise.name === 'abs')
            );

            absDays.forEach(exercise =>
                expect(exercise.label).to.equal('Crunch')
            );
        });

        it('does not update labels for other exercises', () => {
            const action = labelChange('abs', 'Crunch');
            const state = reducer(undefined, action);

            const squatDays = state.map(day =>
                day.find(exercise => exercise.name === 'squats')
            );

            squatDays.forEach(exercise =>
                expect(exercise.label).to.equal('Knebøy')
            );
        });
    });

    describe('When adding exercises', () => {
        it('adds the new exercise to every day', () => {
            const action = addExercise('Markløft', 70, '');
            const state = reducer(undefined, action);

            const deadliftDays = state.map(day =>
                day.find(exercise => exercise.label === 'Markløft')
            );

            deadliftDays.forEach((exercise, idx) => {
                const multiplier = formula.find(
                    f => f.day === idx + 1
                ).multiplier;

                const expectedValue = (70 * multiplier).toFixed(1);

                expect(exercise.label).to.equal('Markløft');
                expect(exercise.value).to.equal(expectedValue);
                expect(exercise.notes).to.equal('');
                expect(exercise.finished).to.equal(false);
            });
        });

        it('uses the same name for all the days', () => {
            const action = addExercise('Markløft', 70, '');
            const state = reducer(undefined, action);

            const deadliftDays = state.map(day =>
                day.find(exercise => exercise.label === 'Markløft')
            );

            const unique = new Set(deadliftDays.map(d => d.name));

            expect(unique.size).to.be(1);
        });
    });
});
