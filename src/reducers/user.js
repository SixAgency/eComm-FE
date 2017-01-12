export default function reducer(state = {
  userName: '',
  emailAddress: '',
  loggedIn: false,
}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      const { userName, emailAddress, loggedIn } = action.payload;
      return { ...state, userName, emailAddress, loggedIn };
    }
    case 'LOGIN_ERROR': {
      return { ...state, userName: '', emailAddress: '', loggedIn: false };
    }
    case 'REGISTRATION_SUCCESS': {
      const { userName, emailAddress, loggedIn } = action.payload;
      return { ...state, userName, emailAddress, loggedIn };
    }
    case 'REGISTRATION_ERROR': {
      return { ...state, user: { userName: '', emailAddress: '' }, loggedIn: false };
    }
    case 'CHECK_SUCCESS': {
      const { userName, emailAddress, loggedIn } = action.payload;
      return { ...state, userName, emailAddress, loggedIn };
    }
    case 'CHECK_ERROR': {
      return { ...state, user: { userName: '', emailAddress: '' }, loggedIn: false };
    }
    default: // do nothing
  }

  return state;
}
