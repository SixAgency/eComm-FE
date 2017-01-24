import { apiFetch } from '../core/fetch';
import { setError, checkResponse, setAddressesResponse, setEditCreateAddressResponse } from './helpers/handlers';
import { faketoken } from '../config';
import conslog from '../utils/dev';

const ADDRESSES = '/api/v1/addresses';

// Get Addresses
function getAddresses(request) {
  return apiFetch(ADDRESSES,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((response) => checkResponse(response))
  .then((data) => setAddressesResponse(data))
  .catch((err) => setError(err));
}

// Create Address
function createAddress(request) {
  const type = request.body.address_type;
  const address = {
    address: request.body.address,
    default_address_types: [type],
  };
  return apiFetch(ADDRESSES,
    {
      method: 'POST',
      body: JSON.stringify(address),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((response) => checkResponse(response))
  .then((data) => setEditCreateAddressResponse(data, type))
  .catch((err) => setError(err));
}

// Edit Address
function updateAddress(request) {
  const type = request.body.address_type;
  const id = request.body.address.id;
  const address = {
    address: request.body.address,
  };
  return apiFetch(`${ADDRESSES}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(address),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((response) => checkResponse(response))
    .then((data) => setEditCreateAddressResponse(data, type))
    .catch((err) => setError(err));
}

export { getAddresses, createAddress, updateAddress };
