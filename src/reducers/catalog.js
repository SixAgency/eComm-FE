export default function reducer(state = {
  gridItems: {
    isLoaded: false,
    products: [],
  },
  mannequinHeads: {
    isLoaded: false,
    products: [],
  },
  product: {
    isLoaded: false,
    product: {},
  },
}, action) {
  switch (action.type) {
    case 'SET_PRODUCTS': {
      return { ...state, gridItems: action.payload };
    }
    case 'SET_MANNEQUIN': {
      return { ...state, mannequinHeads: action.payload };
    }
    case 'SET_PRODUCT': {
      return { ...state, product: action.payload };
    }
    default: // do nothing
  }

  return state;
}
