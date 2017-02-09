export default function reducer(state = {
  order: {
    isLoaded: false,
    order: {},
  },
  message: '',
  isError: false,
}, action) {
  switch (action.type) {
    case 'SET_ORDER': {
      return { ...state, order: action.payload };
    }
    default: // do nothing
  }

  return state;
}
