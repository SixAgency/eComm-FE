import { apiFetch } from './fetch/fetch.server';
import { checkResponse, setError, setContactResponse } from './helpers/handlers';

// Handle contact form

const CONTACT = '/api/v1/contact';

function sendContact(request) {
  return apiFetch(CONTACT, {
    method: 'POST',
    body: JSON.stringify(request.body)
  }, request.session)
  .then((response) => checkResponse(response))
  .then((data) => setContactResponse(data))
  .catch((err) => setError(err));
}

export default sendContact;
