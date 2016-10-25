
export const SET_ERROR = 'setError@app';

export const setError = error => {
    return {
        type: SET_ERROR,
        error,
    }
}
