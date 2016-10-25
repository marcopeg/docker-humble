
import { SET_INFO } from 'actions/services-actions';

export const INITIAL_STATE = {};

export const servicesReducer = (state = INITIAL_STATE, action) => {
    var { type } = action;
    switch (type) {
        case SET_INFO: return setInfo(state, action);
        default: return state;
    }
}

const setInfo = (state, action) => {
    let { appId, serviceData } = action;
    let serviceId = [appId, serviceData.id].join('-');

    let data = state[serviceId] || {};
    data.id = serviceData.id;
    data.appId = appId;

    return {
        ...state,
        [serviceId]: data,
    }
}
