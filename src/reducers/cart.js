export default function reducer(state = {
  cartItems: {
    isLoaded: false,
    isEmpty: true,
    cart: {}
  },
  message: '',
  isError: false
}, action) {
  switch (action.type) {
    case 'SET_CART': {
      return { ...state, cartItems: action.payload };
    }
    default: // do nothing
  }

  return state;
}
