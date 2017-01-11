export default function reducer(state = {
  products: {
    isLoaded: false,
  },
}, action) {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      return { ...state, products: action.payload };
    }
    default: // do nothing
  }

  return state;
}
