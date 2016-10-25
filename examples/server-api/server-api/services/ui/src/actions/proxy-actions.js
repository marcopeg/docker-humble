
export const SET_INFO = 'setInfo@proxy';

export const setInfo = payload => {
    return {
        type: SET_INFO,
        ...payload,
    }
}
