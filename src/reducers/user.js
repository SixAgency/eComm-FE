export default function reducer(state = {
  userName: '',
  emailAddress: '',
  loggedIn: false,
  message: '',
  isError: false,
}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      const { userName, emailAddress, loggedIn } = action.payload;
      const isError = userName === undefined;
      const message = isError ? 'Incorrect username or password.' : `Successfully loggedin as ${userName}`;
      return { ...state, userName, emailAddress, loggedIn, message, isError };
    }
    case 'LOGIN_ERROR': {
      return { ...state, userName: '', emailAddress: '', loggedIn: false, isError: true, message: action.payload };
    }
    case 'LOGOUT_SUCCESS': {
      const message = 'Logout success.';
      return { ...state, userName: '', emailAddress: '', loggedIn: false, message };
    }
    case 'LOGOUT_ERROR': {
      return { ...state, userName: '', emailAddress: '', loggedIn: false };
    }
    case 'REGISTRATION_SUCCESS': {
      const { userName, emailAddress, loggedIn } = action.payload;
      const message = `Successfully loggedin as ${userName}`;
      return { ...state, userName, emailAddress, loggedIn, message };
    }
    case 'REGISTRATION_ERROR': {
      return { ...state, userName: '', emailAddress: '', loggedIn: false };
    }
    case 'GET_USER_SUCCESS': {
      const { userName, emailAddress, loggedIn } = action.payload;
      return { ...state, userName, emailAddress, loggedIn };
    }
    case 'GET_USER_ERROR': {
      return { ...state, userName: '', emailAddress: '', loggedIn: false };
    }
    default: // do nothing
  }

  return state;
}
