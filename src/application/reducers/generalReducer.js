export default function reducer(state={
    loading: true,
}, action) {

    switch (action.type) {
        case "TOGGLE_LOADER": {
            return {...state, loading: action.payload};
        }
    }

    return state;
}