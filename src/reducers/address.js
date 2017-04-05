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
  },
  isFetching: false
}, action) {
  switch (action.type) {
    case 'SET_ADDRESSES': {
      return {
        ...state,
        billing: action.payload.billing,
        shipping: action.payload.shipping,
        addresses: action.payload.addresses,
        isFetching: false
      };
    }
    case 'SET_BILLING': {
      return { ...state, billing: action.payload };
    }
    case 'SET_SHIPPING': {
      return { ...state, shipping: action.payload };
    }
    case 'DELETE_ADDRESS': {
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addresses: state.addresses.addresses.filter(
            (item) => (item.id !== action.payload)
          )
        }
      };
    }
    case 'SET_ADDRESS_FETCHING': {
      return { ...state, isFetching: action.payload };
    }
    default: // do nothing
  }

  return state;
}
