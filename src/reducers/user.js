export default function reducer(state = {
  loggedIn: false,
  profile: {
    isLoaded: false,
    email: '',
    f_name: '',
    l_name: ''
  }
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
