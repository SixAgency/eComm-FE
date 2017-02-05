export default function reducer(state = {
  userName: '',
  emailAddress: '',
  loggedIn: false,
}, action) {
  switch (action.type) {
    case 'SET_USER': {
      return { ...state, ...action.payload };
    }
    default: // do nothing
  }

  return state;
}
