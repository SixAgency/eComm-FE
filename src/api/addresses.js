import { apiFetch } from './fetch';
import {
  setError,
  checkResponse,
  setAddressesResponse,
  setEditCreateAddressResponse,
  setEditAddressResponse,
  setCreateAddressResponse,
  setDeleteAddressResponse
} from './helpers/handlers';

const ADDRESSES = '/api/v1/addresses';

// Get Addresses
function getAddresses(request, isNew) {
  return apiFetch(ADDRESSES, {}, request.session)
  .then((response) => checkResponse(response))
  .then((data) => setAddressesResponse(data, isNew))
  .catch((err) => setError(err));
}

// Create Address
function createAddress(request) {
  return apiFetch(ADDRESSES,
    {
      method: 'POST',
      body: JSON.stringify(request.body.data)
    }, request.session)
  .then((response) => checkResponse(response))
  .then((data) => setCreateAddressResponse(data, request, getAddresses))
  .catch((err) => setError(err));
}

// Edit Address
function updateAddress(request) {
  const type = request.body.address_type;
  const id = request.body.address.id;
  const address = { address: request.body.address };
  return apiFetch(`${ADDRESSES}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(address)
    }, request.session)
    .then((response) => checkResponse(response))
    .then((data) => setEditAddressResponse(data, request, getAddresses))
    .catch((err) => setError(err));
}

// Edit Address
function setDefaultAddress(request) {
  return apiFetch(`${ADDRESSES}/default`,
    {
      method: 'PATCH',
      body: JSON.stringify(request.body.data)
    }, request.session)
    .then((response) => checkResponse(response))
    .then((data) => setEditCreateAddressResponse(data))
    .catch((err) => setError(err));
}

// Delete Address
function deleteAddress(request) {
  return apiFetch(`${ADDRESSES}/${request.params.id}`,
    {
      method: 'DELETE'
    }, request.session)
  .then((response) => checkResponse(response))
  .then((data) => setDeleteAddressResponse(data))
  .catch((err) => setError(err));
}

export {
  getAddresses,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress
};
