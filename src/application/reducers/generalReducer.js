export default function reducer(state={
    loading: true,
    currentStyles: {}
}, action) {

    switch (action.type) {
        case "TOGGLE_LOADER": {
            return {...state, loading: action.payload};
        }
        case "NAV_ITEM_HOVER": {
            return {...state, currentStyles: action.payload};
        }
    }

    return state;
}