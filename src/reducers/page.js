export default function reducer(state = {
  headerProps: {
    headerClass: 'colored',
    activeSlug: '/'
  },
  showLoader: true,
  isError: false,
  messages: [],
  showMobileNav: false
}, action) {
  switch (action.type) {
    case 'SET_HEADER_PROPS': {
      return { ...state, headerProps: action.payload };
    }
    case 'RESET_MESSAGES': {
      return { ...state, isError: false, messages: [] };
    }
    case 'SET_MESSAGES': {
      return { ...state, isError: action.payload.isError, messages: action.payload.messages };
    }
    case 'TOGGLE_LOADER': {
      return { ...state, showLoader: action.payload };
    }
    case 'TOGGLE_MOBILE_NAV': {
      return { ...state, showMobileNav: action.payload };
    }
    default: // do nothing
  }

  return state;
}
