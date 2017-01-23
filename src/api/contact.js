import { apiFetch } from '../core/fetch';
import { parseError, parseResponse } from './handlers';
import { faketoken } from '../config';

// Handle contact form

const CONTACT = '/api/v1/sendcontact'; // update once we have an endpoint

function sendContact(request) {
  const response = apiFetch(CONTACT, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken,
    },
  })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  return response;
}

export default sendContact;
