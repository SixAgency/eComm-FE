import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';

/**
* Helper - Send Contact
* @returns {{type: string, payload: {isLoaded: boolean, message: array}}}
*/
function setContact() {
  const data = {
    isLoaded: true,
    message: 'Thank you for your message. It has been sent.',
  };
  return { type: 'SEND_CONTACT_SUCCES', payload: data };
}

function sendContact(data) {
  return (dispatch) => {
    axios.post('/api/contact', data)
      .then((response) => checkResponse(response.data, () => {
        console.log('RESPONSE HERE', response);
        dispatch(setContact());
        dispatch(setMessage({ isError: false, messages: data.message }));
      }, () => {
        dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
      }))
      .catch((err) => {
        console.error('Error', err);
        forwardTo('error');
      });
  };
}

export default sendContact;

