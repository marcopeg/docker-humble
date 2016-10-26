
import { SET_CACHE } from 'actions/app-actions';

export const INITIAL_STATE = {
    proxy: {},
    apps: {},
};

export const cacheReducer = (state = INITIAL_STATE, action) => {
    var { type } = action;
    switch (type) {
        case SET_CACHE: return setCache(state, action);
        default: return state;
    }
}

const setCache = (state, action) => {
    let { cache } = action;
    return { ...cache };
}
