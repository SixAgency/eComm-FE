import axios from "axios";

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

export function toggleMobileNav(toggle) {
    return function(dispatch) {
        dispatch({type: "TOGGLE_MOBILE_NAV", payload: toggle});
    };
}

export function getProducts() {
    return function(dispatch) {
        const token = "3637b8b39f4a33a248c4f296436d49b0ad45f60ffaacdef1";
        axios.get("http://staging.ecomm.com/api/products?token="+token)
            .then((response) => {
                dispatch({
                    type: "FETCH_PRODUCTS",
                    payload: response.data
                });
            })
        .catch((err) => {
            dispatch({type: "FETCH_PRODUCTS_REJECTED", payload: err});
        });
    };
}

export function getProduct(query) {
    return function(dispatch) {
        const token = "3637b8b39f4a33a248c4f296436d49b0ad45f60ffaacdef1";
        axios.get("http://staging.ecomm.com/api/products/"+query
            +"?token="+
            token)
            .then((response) => {
                dispatch({
                    type: "FETCH_PRODUCT",
                    payload: response.data
                });
            })
        .catch((err) => {
            dispatch({type: "FETCH_PRODUCT_REJECTED", payload: err});
        });
    };
}