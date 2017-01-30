import { apiFetch } from '../core/fetch';
import { parseError, parseResponse } from './handlers';
import conslog from '../utils/dev';

// Handle contact form

const CONTACT = '/contact';

function sendContact(request) {
  conslog('CONTACT REQUEST', request.body);
  const response = apiFetch(CONTACT, {
    method: 'POST',
    body: JSON.stringify(request.body),
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
