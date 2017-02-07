import { apiFetch } from '../core/fetch';
import { checkResponse, setError, setContactResponse } from './helpers/handlers';
import conslog from '../utils/dev';

// Handle contact form

const CONTACT = '/api/v1/contact';

function sendContact(request) {
  conslog('CONTACT REQUEST', request.body);
  return apiFetch(CONTACT, {
    method: 'POST',
    body: JSON.stringify(request.body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => checkResponse(response))
  .then((data) => setContactResponse(data))
  .catch((err) => setError(err));
}

export default sendContact;
