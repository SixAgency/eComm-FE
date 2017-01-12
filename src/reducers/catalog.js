export default function reducer(state = {
  gridItems: {
    isLoaded: false,
    products: [],
  },
  error: '',
}, action) {
  switch (action.type) {
    case 'GET_PRODUCTS_SUCCESS': {
      return { ...state, gridItems: { isLoaded: true, products: action.payload } };
    }
    case 'GET_PRODUCTS_ERROR': {
      return { ...state, gridItems: { isLoaded: false, products: [] }, message: action.payload };
    }
    default: // do nothing
  }

  return state;
}
