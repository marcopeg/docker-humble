
export const SET_INFO = 'setInfo@services';

export const setInfo = (appId, serviceData) => {
    return {
        type: SET_INFO,
        appId,
        serviceData,
    }
}
