import axios from 'axios';

function sendContact() {
  return (dispatch) => {
    axios.post('/api/sendcontact')
    .then((resp) => {
      console.log('RESP', resp);
    })
    .catch((err) => {
      console.log('ERR', err);
    });
  };
}

export default sendContact;

