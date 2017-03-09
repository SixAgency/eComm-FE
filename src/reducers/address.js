export default function reducer(state = {
  billing: {
    isLoaded: false,
    isEmpty: true,
    address: {}
  },
  shipping: {
    isLoaded: false,
    isEmpty: true,
    address: {}
  },
  addresses: {
    isLoaded: false,
    isEmpty: true,
    addresses: []
  }
}, action) {
  switch (action.type) {
    case 'SET_ADDRESSES': {
      return {
        ...state,
        billing: action.payload.billing,
        shipping: action.payload.shipping,
        addresses: action.payload.addresses
      };
    }
    case 'SET_BILLING': {
      return { ...state, billing: action.payload };
    }
    case 'SET_SHIPPING': {
      return { ...state, shipping: action.payload };
    }
    case 'DELETE_ADDRESS': {
      return { ...state, delete: action.payload };
    }
    default: // do nothing
  }

  return state;
}
