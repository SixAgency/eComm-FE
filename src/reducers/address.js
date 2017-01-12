export default function reducer(state = {
  billing: {
    isLoaded: false,
    isEmpty: true,
    address: {},
  },
  shipping: {
    isLoaded: false,
    isEmpty: true,
    address: {},
  },
  message: '',
  isError: false,
}, action) {
  switch (action.type) {
    case 'GET_ADDRESS_SUCCESS': {
      console.log(action.payload);
      break;
    }
    case 'GET_ADDRESS_ERROR': {
      return { ...state,
        billing: {
          isLoaded: false,
          isEmpty: true,
          address: {},
        },
        shipping: {
          isLoaded: false,
          isEmpty: true,
          address: {},
        },
        message: action.payload,
        isError: true,
      };
    }
    default: // do nothing
  }

  return state;
}
