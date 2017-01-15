import { apiFetch } from '../core/fetch';
import { parseError, parseResponse } from './handlers';
import conslog from '../utils/dev';

const ADDRESSES = '/api/v1/addresses';
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
    address: request.body.address,
    default_address_types: request.body.address_type,
  };
  conslog(address);
  return apiFetch(ADDRESSES,
    {
      method: 'POST',
      body: JSON.stringify(address),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || token,
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
}

export { getAddresses, createAddress };
