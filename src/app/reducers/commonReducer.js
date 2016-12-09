export default function reducer(state={
    loading: true,
    heroHeight: 127,
    navOpened: false,
    currentStyles: {},
    products: [],
    product: null,
    cart: null
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
        case "FETCH_PRODUCTS": {
            return {...state, products: action.payload.products};
        }
        case "FETCH_PRODUCTS_REJECTED": {
            return {...state, error: action.payload};
        }
        case "FETCH_PRODUCT": {
            return {...state, product: action.payload, loading: false};
        }
        case "FETCH_PRODUCT_REJECTED": {
            return {...state, error: action.payload};
        }
        case "FETCH_CART": {
            return {...state, cart: action.payload};
        }
        case "FETCH_CART_REJECTED": {
            return {...state, error: action.payload};
        }
    }

    return state;
}