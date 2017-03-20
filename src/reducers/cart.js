export default function reducer(state = {
  cartItems: {
    isLoaded: false,
    isEmpty: true,
    cart: {}
  },
  message: '',
  isError: false,
  isCartPending: false
}, action) {
  switch (action.type) {
    case 'SET_CART': {
      return { ...state, cartItems: action.payload };
    }
    case 'CART_PENDING': {
      return { ...state, isCartPending: action.payload };
    }
    default: // do nothing
  }

  return state;
}
