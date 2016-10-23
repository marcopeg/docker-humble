
export const SET_LIST = 'setList@apps';
export const SET_INFO = 'setInfo@apps';

export const setList = items => {
    return {
        type: SET_LIST,
        items,
    };
};

export const setInfo = (name, data) => {
    return {
        type: SET_INFO,
        name,
        data,
    };
};
