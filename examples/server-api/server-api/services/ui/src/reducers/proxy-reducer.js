
import { SET_INFO } from 'actions/proxy-actions';

export const INITIAL_STATE = {
    ip: null,
    port: null,
}

export const proxyReducer = (state = INITIAL_STATE, action) => {
    var { type } = action;
    switch (type) {
        case SET_INFO: return setError(state, action);
        default: return state;
    }
}

const setError = (state, action) => {
    let { ip, port } = action;
    return {
        ...state,
        ip,
        port,
    }
}
