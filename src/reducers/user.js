export default function reducer(state = {
  loggedIn: false,
  profile: {
    isLoaded: false,
    email: '',
    f_name: '',
    l_name: ''
  },
  creditInfo: {
    isLoaded: false,
    totalAmount: {}
  }
}, action) {
  if (['SET_USER', 'SET_PROFILE', 'SET_STORE_CREDIT_INFO'].includes(action.type)) {
    return { ...state, ...action.payload };
  }
  return state;
}
