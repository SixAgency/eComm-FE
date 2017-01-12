export default function reducer(state = {
  cartItems: {
    isLoaded: false,
    isEmpty: true,
    cart: {},
  },
  message: '',
  isError: false,
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
        message: action.payload,
        isError: true,
      };
    }
    case 'ADD_CART_SUCCESS': {
      return { ...state, message: action.payload.message, isError: false };
    }
    case 'ADD_CART_ERROR': {
      return { ...state, message: action.payload.message, isError: true };
    }
    case 'REMOVE_CART_SUCCESS': {
      return { ...state, message: action.payload.message, isError: false };
    }
    case 'REMOVE_CART_ERROR': {
      return { ...state, message: action.payload.message, isError: true };
    }
    default: // do nothing
  }

  return state;
}
