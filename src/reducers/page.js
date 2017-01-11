export default function reducer(state = {
  headerProps: {
    headerClass: 'colored',
    activeSlug: '/',
  },
}, action) {
  switch (action.type) {
    case 'SET_HEADER_PROPS': {
      return { ...state, headerProps: action.payload };
    }
    default: // do nothing
  }

  return state;
}
