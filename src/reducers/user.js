export default function reducer(state = {
  userName: '',
  emailAddress: '',
  loggedIn: false,
  profile: {}
}, action) {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ...action.payload };
    }
    case 'SET_PROFILE': {
      return { ...state, ...action.payload };
    }
    default: // do nothing
  }

  return state;
}
