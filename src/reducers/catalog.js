export default function reducer(state = {
  gridItems: {
    isLoaded: false,
    products: [],
  },
  gridRecs: {
    isLoaded: false,
    products: [],
  },
  product: {
    isLoaded: false,
    product: {},
  },
  message: '',
}, action) {
  switch (action.type) {
    case 'GET_PRODUCTS_SUCCESS': {
      return { ...state, gridItems: { isLoaded: true, products: action.payload } };
    }
    case 'GET_PRODUCTS_ERROR': {
      return { ...state, gridItems: { isLoaded: false, products: [] }, message: action.payload };
    }
    case 'GET_PRODUCT_SUCCESS': {
      return { ...state, product: { isLoaded: true, product: action.payload } };
    }
    case 'GET_PRODUCT_ERROR': {
      return { ...state, product: { isLoaded: false, product: {} }, message: action.payload };
    }
    case 'GET_RECS_SUCCESS': {
      return { ...state, gridRecs: { isLoaded: true, products: action.payload } };
    }
    case 'GET_RECS_ERROR': {
      return { ...state, gridRecs: { isLoaded: false, products: [] }, message: action.payload };
    }
    default: // do nothing
  }

  return state;
}
