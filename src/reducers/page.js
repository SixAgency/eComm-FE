export default function reducer(state = {
  headerProps: {
    headerClass: 'colored',
    activeSlug: '/',
  },
  isError: false,
  message: '',
}, action) {
  switch (action.type) {
    case 'SET_HEADER_PROPS': {
      return { ...state, headerProps: action.payload };
    }
    case 'RESET_MESSAGES': {
      return { ...state, isError: false, message: '' };
    }
    case 'SET_MESSAGE': {
      return { ...state, isError: action.payload.isError, message: action.payload.message };
    }
    default: // do nothing
  }

  return state;
}
