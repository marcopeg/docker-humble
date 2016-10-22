
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import { reducers } from 'reducers';
const reducer = combineReducers(reducers);
const middlewares = [reduxThunk];

var store;

export function makeStore(initialState) {
    var finalCreateStore = applyMiddleware(...middlewares)(createStore);
    store = finalCreateStore(reducer, initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}

export function dispatch(action) {
    store.dispatch(action);
}
