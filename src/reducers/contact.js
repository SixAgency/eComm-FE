export default function reducer(state = {
  message: '',
  isSent: false
}, action) {
  switch (action.type) {
    case 'SEND_CONTACT_SUCCESS': {
      return { ...state, message: action.payload, isSent: true };
    }
    case 'SEND_CONTACT_ERROR': {
      return { ...state, message: action.payload, isSent: false };
    }
    default: // do nothing
  }
  return state;
}
