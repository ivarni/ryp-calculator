import reducer, { defaultUser } from '../../src/reducers/user';

import { setUserData } from '../../src/actions';

describe('user reducer', () => {
    it('returns the default state', () => {
        const action = { type: 'UNKNOWN' };
        const state = reducer(undefined, action);

        expect(state).to.eql(defaultUser);
    });

    describe('when updating user data', () => {
        it('sets the name and token', () => {
            const action = setUserData('Foo Bar', 'abc');
            const state = reducer(defaultUser, action);

            expect(state.name).to.be('Foo Bar');
            expect(state.token).to.be('abc');
        });

        it('sets only the token', () => {
            const action = setUserData(null, 'abc');
            const state = reducer(defaultUser, action);

            expect(state.name).to.be(defaultUser.name);
            expect(state.token).to.be('abc');
        });

        it('sets only the name', () => {
            const action = setUserData('Foo Bar');
            const state = reducer(undefined, action);

            expect(state.name).to.be('Foo Bar');
            expect(state.token).to.be(defaultUser.token);
        });
    });
});
