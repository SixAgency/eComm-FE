export default function reducer(state = {
  cartState: 'cart',
  isPayPal: false,
  paypal: {
    isLoaded: false,
    isEmpty: true,
    tokens: {},
  },
  billing: {
    isLoaded: false,
    isEmpty: true,
    address: {},
  },
  shipping: {
    isLoaded: false,
    isEmpty: true,
    address: {},
  },
}, action) {
  switch (action.type) {
    case 'SET_PAYPAL': {
      return { ...state, paypal: action.payload };
    }
    case 'SET_CHECKOUT_BILLING': {
      console.log('payload', action.payload);
      return { ...state, billing: action.payload };
    }
    case 'SET_CHECKOUT_SHIPPING': {
      return { ...state, shipping: action.payload };
    }
    case 'SET_CART_STATE': {
      return { ...state, cartState: action.payload };
    }
    case 'SET_PAYMENT': {
      return { ...state, isPayPal: action.payload };
    }
    default: // do nothing
  }

  return state;
}
