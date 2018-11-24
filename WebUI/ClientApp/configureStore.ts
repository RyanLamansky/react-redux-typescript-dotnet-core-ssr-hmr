import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    GenericStoreEnhancer,
    ReducersMapObject,
    Store,
    StoreEnhancerStoreCreator
} from 'redux';
import thunk from 'redux-thunk';
import {
    routerMiddleware,
    routerReducer
} from 'react-router-redux';
import * as StoreModule from './store';
import {
    ApplicationState,
    reducers
} from './store';
import { History } from 'history';

export default function configureStore(history: History, initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__ as () => GenericStoreEnhancer;
    const createStoreWithMiddleware = compose<StoreEnhancerStoreCreator<any>>(
        applyMiddleware(thunk, routerMiddleware(history)),
        devToolsExtension ? devToolsExtension() : <S>(next: StoreEnhancerStoreCreator<S>) => next
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers);
    const store = createStoreWithMiddleware(allReducers, initialState) as Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require<typeof StoreModule>('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers: typeof reducers) {
    return combineReducers<ApplicationState>({ ...allReducers, routing: routerReducer } as ReducersMapObject);
}
