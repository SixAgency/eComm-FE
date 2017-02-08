export default function reducer(state = {
  paypal: {
    isLoaded: false,
    isEmpty: true,
    tokens: {},
  },
}, action) {
  switch (action.type) {
    case 'SET_PAYPAL': {
      return { ...state, paypal: action.payload };
    }
    default: // do nothing
  }

  return state;
}
