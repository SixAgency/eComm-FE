import { apiFetch } from '../core/fetch';
import { parseError, parseResponse } from './handlers';

// Handle contact form

const CONTACT = '/api/v1/contact';

function sendContact(request) {
  const response = apiFetch(CONTACT, {
    method: 'POST',
    body: JSON.stringify({ request }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  return response;
}

export default sendContact;
