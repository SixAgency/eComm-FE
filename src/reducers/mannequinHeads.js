export default function reducer(state = {
  products: [],
}, action) {
  switch (action.type) {
    case 'GET_MANNEQUINHEADS_SUCCESS': {
      return {
        ...state,
        products: action.payload,
        isError: false,
      };
    }
    case 'GET_MANNEQUINHEADS_ERROR': {
      return { ...state, message: action.payload, isError: true };
    }
    default: // do nothing
  }
  return state;
}
