export function toggleLoader(toggle) {
    return function(dispatch) {
        dispatch({type: "TOGGLE_LOADER", payload: toggle});
    };
}

export function onNavItemHover(styles) {
    return (
        {type: "NAV_ITEM_HOVER", payload: styles}
    );
}