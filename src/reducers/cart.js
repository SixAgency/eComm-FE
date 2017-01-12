export default function reducer(state = {
  cartItems: {
    isLoaded: false,
    isEmpty: true,
    cart: {},
  },
  error: '',
}, action) {
  switch (action.type) {
    case 'GET_CART_SUCCESS': {
      return { ...state, cartItems: action.payload };
    }
    case 'GET_CART_ERROR': {
      return { ...state,
        cartItems: {
          isLoaded: false,
          isEmpty: true,
          cart: {},
        },
        message: action.payload };
    }
    default: // do nothing
  }

  return state;
}
