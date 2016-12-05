export default function reducer(state={
    loading: true,
    heroHeight: 127,
    navOpened: false,
    currentStyles: {}
}, action) {
    switch (action.type) {
        case "TOGGLE_LOADER": {
            return {...state, loading: action.payload};
        }
        case "SET_HERO_HEIGHT": {
            return {...state, heroHeight: action.payload};
        }
        case "TOGGLE_MOBILE_NAV": {
            return {...state, navOpened: action.payload};
        }
    }

    return state;
}