import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';
import { validateContactForm } from '../helpers/validators';

/**
 * Send contact data
 * @param data
 * @returns {function(*=)}
 */
function sendContact(data) {
  console.log('data', data);
  return (dispatch) => {
    const valid = validateContactForm(data.contact);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      axios.post('/api/contact', data)
        .then((response) => checkResponse(response.data, () => {
          dispatch(setMessage({ isError: false, messages: response.data.messages }));
        }, () => {
          dispatch(setMessage({ isError: true, messages: [response.data.messages] }));
        }))
        .catch((err) => {
          console.error('Error', err);
          forwardTo('error');
        });
    }
  };
}

export default sendContact;

