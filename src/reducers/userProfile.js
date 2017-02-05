export default function reducer(state = {
  profile: null,
  loggedIn: true,
}, action) {
  switch (action.type) {
    case 'GET_PROFILE_SUCCESS': {
      return { ...state, profile: action.payload.profile };
    }
    default: // do nothing
  }

  return state;
}
