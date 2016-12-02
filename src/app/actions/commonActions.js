export function toggleLoader(toggle) {
    return function(dispatch) {
        dispatch({type: "TOGGLE_LOADER", payload: toggle});
    };
}

export function setHeroHeight(height) {
    return function(dispatch) {
        dispatch({type: "SET_HERO_HEIGHT", payload: height});
    };
}