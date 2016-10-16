import makeStore from '../../src/store/makeStore';
import saga from '../../src/reducers/sagas';
import configureStore, {
    middlewares,
    sagaMiddleware,
} from '../../src/store/configureStore.prod';
import {
    fieldChange,
    FIELD_CHANGE,
    EXERCISES_UPDATED,
} from '../../src/actions';

describe('prod store integration test', () => {
    let store;

    before(() => {
        store = configureStore();
    });

    it('Updates the store when actions are dispatched', () => {
        const state = store.getState();
        store.subscribe(() => {
            const newState = store.getState();
            expect(newState).to.not.eql(state);
        });
        store.dispatch(fieldChange('squats', 90));
    });
});

describe('store sagas', () => {
    let store;
    const actions = [];
    const actionLogger = () => () => action => actions.push(action);

    before(() => {
        store = makeStore(middlewares.concat(actionLogger));
        sagaMiddleware.run(saga);
    });

    afterEach(() => {
        actions.length = 0;
    });

    it('dispatches an action when a field is changed', () => {
        store.dispatch(fieldChange('squats', 90));

        expect(actions[0].type).to.equal(FIELD_CHANGE);
        expect(actions[1].type).to.equal(EXERCISES_UPDATED);
    });
});
