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
    case 'RESET_CART': {
      return { ...state, cartItems: action.payload };
    }
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
    case 'UPDATE_CART_SUCCESS': {
      return {
        ...state,
        message: action.payload.message,
        cartItems: action.payload.cart,
        isError: false,
      };
    }
    case 'UPDATE_CART_ERROR': {
      return { ...state, message: action.payload.message, isError: true };
    }
    case 'UPDATE_QTY_SUCCES': {
      return {
        ...state,
        cartItems: action.payload,
        isError: false,
      };
    }
    case 'APPLY_PROMO_CODE_SUCCESS': {
      return { ...state, message: action.payload.message, isError: false };
    }
    case 'APPLY_PROMO_CODE_ERROR': {
      return { ...state, message: action.payload.message, isError: true };
    }
    default: // do nothing
  }

  return state;
}
