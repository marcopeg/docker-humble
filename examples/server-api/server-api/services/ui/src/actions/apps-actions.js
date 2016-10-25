
export const SET_LIST = 'setList@apps';
export const SET_INFO = 'setInfo@apps';
export const SET_SERVICES = 'setServices@apps';

export const setList = list => {
    return {
        type: SET_LIST,
        list,
    }
}

export const setInfo = data => {
    return {
        type: SET_INFO,
        data,
    }
}

export const setServices = (appId, services) => {
    return {
        type: SET_SERVICES,
        appId,
        services,
    }
}
