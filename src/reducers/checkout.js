export default function reducer(state = {
  isPayPal: false,
  paypal: {
    isLoaded: false,
    isEmpty: true,
    tokens: {},
  },
  billing: {
    isSet: false,
    isEmpty: true,
    address: 0,
  },
  shipping: {
    isSet: false,
    isEmpty: true,
    address: 0,
  },
}, action) {
  switch (action.type) {
    case 'SET_PAYPAL': {
      return { ...state, paypal: action.payload };
    }
    case 'SET_CHECKOUT_BILLING': {
      return { ...state, billing: action.payload };
    }
    case 'SET_CHECKOUT_SHIPPING': {
      return { ...state, shipping: action.payload };
    }
    case 'SET_PAYMENT': {
      return { ...state, isPayPal: action.payload };
    }
    default: // do nothing
  }

  return state;
}
