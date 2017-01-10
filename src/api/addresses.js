import { apiFetch } from '../core/fetch';
import { parseError, parseResponse } from './handlers';

const ADDRESSES = '/api/addresses';
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';

// Get Addresses
function getAddresses(request) {
  const slug = request.params.slug || '';
  const response = apiFetch(`${ADDRESSES}/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || token,
      },
    })
  .then((data) => parseResponse(data))
  .then((data) => (data))
  .catch((err) => parseError(err));
  return response;
}

// Create Address
function createAddress(request) {
  // TODO - ADD DATA VALIDATION
  const address = {
    spree_user: {
      email: request.body.username,
      password: request.body.password,
      remember_me: request.body.remember,
    },
  };

  apiFetch(ADDRESSES,
    {
      method: 'POST',
      body: JSON.stringify(address),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
}

export { getAddresses, createAddress };
