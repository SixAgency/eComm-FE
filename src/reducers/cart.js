export default function reducer(state = {
  cartItems: {
    isLoaded: false,
    isEmpty: true,
    cart: {
      shipments: []
    }
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
    case 'SET_CART_SHIPMENTS': {
      const newCart = { ...state.cartItems };
      newCart.cart.shipments = action.payload.shipments;
      newCart.cart.total = (parseFloat(newCart.cart.total) + action.payload.cost).toString();
      return {
        ...state,
        cartItems: newCart,
      };
    }
    default: // do nothing
  }

  return state;
}
