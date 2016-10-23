
export const INITIAL_STATE = {
    title: 'React Client',
    avengers: [{name:'IronMan'},{name:'Hulk'}, {name:'CaptainAmerica'}],
};

export function appReducer(state = INITIAL_STATE, action) {
    var { type } = action;
    switch (type) {
        case 'add':
            return {
                ...state,
                avengers: [...state.avengers, {name:action.value}],
            };
        default: return state;
    }
}
