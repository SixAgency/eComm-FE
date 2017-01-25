import axios from 'axios';

function sendContact() {
  return (dispatch) => {
    axios.post('/api/contact')
    .then(() => {
      dispatch({ type: 'SEND_CONTACT_SUCCESS', payload: 'Thank you for your message. It has been sent.' });
    })
    .catch((err) => {
      dispatch({ type: 'SEND_CONTACT_ERROR', payload: err.message });
    });
  };
}

export default sendContact;

