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
      const billing = {
        isLoaded: true,
        isEmpty: action.payload.bill_address === null,
        address: action.payload.bill_address,
      }
      const shipping = {
        isLoaded: true,
        isEmpty: action.payload.ship_address === null,
        address: action.payload.ship_address,
      }
      return { ...state, billing, shipping };
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
    case 'SHIPPING_ADD_SUCCESS': {
      const message = 'Address added successfully.';
      const address = {
        isLoaded: true,
        isEmpty: false,
        shipping: action.payload.address,
      }
      return { ...state, address, message };
    }
    case 'SHIPPING_ADD_ERROR': {
      const message = 'Error.';
      const address = {
        isLoaded: false,
        isEmpty: false,
        shipping: {},
      }
      return { ...state, address, message };
    }
    case 'BILLING_ADD_SUCCESS': {
      const message = 'Address added successfully.';
      const address = {
        isLoaded: true,
        isEmpty: false,
        billing: action.payload.address,
      }
      return { ...state, address, message };
    }
    case 'BILLING_ADD_ERROR': {
      const message = 'Error.';
      const address = {
        isLoaded: false,
        isEmpty: false,
        billing: {},
      }
      return { ...state, address, message };
    }
    default: // do nothing
  }

  return state;
}
