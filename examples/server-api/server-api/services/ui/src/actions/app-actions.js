
export const SET_ERROR = 'setError@app';
export const SET_CACHE = 'setCache@app';

export const setError = error => {
    return {
        type: SET_ERROR,
        error,
    }
}

export const setCache = cache => {
    return {
        type: SET_CACHE,
        cache,
    }
}
