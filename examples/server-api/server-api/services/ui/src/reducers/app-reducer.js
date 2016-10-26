
import { SET_ERROR } from 'actions/app-actions';

export const INITIAL_STATE = {
    error: null,
};

export const appReducer = (state = INITIAL_STATE, action) => {
    var { type } = action;
    switch (type) {
        case SET_ERROR: return setError(state, action);
        default: return state;
    }
}

const setError = (state, action) => {
    let { error } = action;
    return {
        ...state,
        error,
    }
}
