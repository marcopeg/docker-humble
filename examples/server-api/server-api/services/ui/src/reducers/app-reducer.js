
export const INITIAL_STATE = {
    title: 'Humble Server',
    ip: '0.0.0.0',
};

export function appReducer(state = INITIAL_STATE, action) {
    var { type } = action;
    switch (type) {
        default: return state;
    }
}
