export default function reducer(state = {
  message: '',
}, action) {
  switch (action.type) {
    case 'SEND_CONTACT_SUCCESS': {
      return { ...state, message: action.payload };
    }
    case 'SEND_CONTACT_ERROR': {
      return { ...state, message: action.payload };
    }
    default: // do nothing
  }
  return state;
}
