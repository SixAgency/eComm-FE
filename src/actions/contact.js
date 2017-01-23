import axios from 'axios';

function sendContact() {
  return (dispatch) => {
    axios.post('/api/contact')
    .then((resp) => {
      dispatch({ type: 'SEND_CONTACT_SUCCESS', payload: resp.data });
    })
    .catch((err) => {
      dispatch({ type: 'SEND_CONTACT_ERROR', payload: err });
    });
  };
}

export default sendContact;

