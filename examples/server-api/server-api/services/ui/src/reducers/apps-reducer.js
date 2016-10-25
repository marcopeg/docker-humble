
import {
    SET_LIST,
    SET_INFO,
    SET_SERVICES,
} from 'actions/apps-actions';

export const INITIAL_STATE = {
    _list: [],
};

export function appsReducer(state = INITIAL_STATE, action) {
    var { type } = action;
    switch (type) {
        case SET_LIST: return setList(state, action);
        case SET_INFO: return setInfo(state, action);
        case SET_SERVICES: return setServices(state, action);
        default: return state;
    }
}

function setList(state, action) {
    let { list } = action;
    return {
        ...state,
        _list: list,
    }
}

function setInfo(state, action) {
    let { data } = action;
    let { id, name, host, port } = data;

    let appData = state[id] || {};
    appData.id = id;
    appData.name = name;
    appData.host = host;
    appData.port = port;

    return {
        ...state,
        [id]: appData,
    }
}

function setServices(state, action) {
    let { appId, services } = action;
    let appData = state[appId] || {};
    appData.services = services;
    return {
        ...state,
        [appId]: appData,
    }
}
