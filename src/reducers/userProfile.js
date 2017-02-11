export default function reducer(state = {
  profile: null,
  loggedIn: true,
}, action) {
  switch (action.type) {
    case 'SET_PROFILE': {
      return { ...state, profile: action.payload };
    }
    default: // do nothing
  }

  return state;
}
