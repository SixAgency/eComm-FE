export default function reducer(state = {
  userName: '',
  emailAddress: '',
  loggedIn: false,
}, action) {
  switch (action.type) {
    case 'SET_USER': {
      const { userName, emailAddress, loggedIn } = action.payload;
      return { ...state, userName, emailAddress, loggedIn };
    }
    default: // do nothing
  }

  return state;
}
