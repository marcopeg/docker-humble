
export const SET_ERROR = 'setError@app';

export const setError = err => {
    return {
        type: SET_ERROR,
        err,
    };
}
