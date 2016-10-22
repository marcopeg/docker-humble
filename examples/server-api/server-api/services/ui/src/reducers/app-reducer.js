
export const INITIAL_STATE = {
    title: 'React Client',
    avengers: [{name:'foo'},{name:'faa'}],
};

export function appReducer(state = INITIAL_STATE, action) {
    var { type } = action;
    switch (type) {
        case 'add':
            return {
                ...state,
                avengers: [...state.avengers, {name:'fii'}],
            };
        default: return state;
    }
}
