export default function reducer(state = {
  gridItems: {
    isLoaded: false,
    products: []
  },
  mannequinHeads: {
    isLoaded: false,
    products: []
  },
  product: {
    isLoaded: false,
    product: {}
  },
  categoryItems: {
    isLoaded: false,
    slug: '',
    products: []
  },
  isFetching: true
}, action) {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      return { ...state, gridItems: action.payload };
    }
    case 'SET_MANNEQUIN': {
      return { ...state, mannequinHeads: action.payload };
    }
    case 'SET_PRODUCT': {
      return { ...state, product: action.payload, isFetching: false };
    }
    case 'SET_PRODUCT_PENDING': {
      return { ...state, isFetching: action.payload };
    }
    case 'SET_CATEGORY': {
      return { ...state, categoryItems: action.payload };
    }
    default: // do nothing
  }

  return state;
}
