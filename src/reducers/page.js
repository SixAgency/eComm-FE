export default function reducer(state = {
  headerProps: {
    headerClass: 'colored',
    activeSlug: '/',
  },
  showLoader: true,
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
    case 'TOGGLE_LOADER': {
      return { ...state, showLoader: action.payload };
    }
    default: // do nothing
  }

  return state;
}
