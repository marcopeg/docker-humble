
import { SET_LIST, SET_INFO } from 'actions/apps-actions';

export const INITIAL_STATE = {
    items: [],
    info: {},
};

export function appsReducer(state = INITIAL_STATE, action) {
    var { type } = action;
    switch (type) {
        case SET_LIST: return setList(state, action);
        case SET_INFO: return setInfo(state, action);
        default: return state;
    }
}

function setList(state, action) {
    let { items } = action;
    return { ...state, items: items };
}

function setInfo(state, action) {
    let { items, name, data } = action;

    let info = { ...state.info };
    info[name] = data;

    return { ...state, info};
}
