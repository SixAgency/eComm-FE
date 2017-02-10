import { apiFetch } from '../core/fetch';
import {
  setError,
  checkResponse,
  setAddressesResponse,
  setEditCreateAddressResponse,
  setCreateAddressResponse
} from './helpers/handlers';
import { faketoken } from '../config';

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
  return apiFetch(ADDRESSES,
    {
      method: 'POST',
      body: JSON.stringify(request.body.data),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((response) => checkResponse(response))
  .then((data) => setCreateAddressResponse(data, request, getAddresses))
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

// Edit Address
function setDefaultAddress(request) {
  return apiFetch(`${ADDRESSES}/default`,
    {
      method: 'PATCH',
      body: JSON.stringify(request.body.data),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((response) => checkResponse(response))
    .then((data) => setEditCreateAddressResponse(data))
    .catch((err) => setError(err));
}

export { getAddresses, createAddress, updateAddress, setDefaultAddress };
