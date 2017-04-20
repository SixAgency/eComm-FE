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
  let status;
  return apiFetch(ADDRESSES, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setAddressesResponse(data, isNew))
    .catch((err) => setError(err));
}

// Create Address
function createAddress(request) {
  let status;
  return apiFetch(ADDRESSES,
    {
      method: 'POST',
      body: JSON.stringify(request.body.data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCreateAddressResponse(data, request, getAddresses))
    .catch((err) => setError(err));
}

// Edit Address
function updateAddress(request) {
  let status;
  const id = request.body.address.id;
  const address = { address: request.body.address };
  return apiFetch(`${ADDRESSES}/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(address)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setEditAddressResponse(data, request, getAddresses))
    .catch((err) => setError(err));
}

// Edit Address
function setDefaultAddress(request) {
  let status;
  return apiFetch(`${ADDRESSES}/default`,
    {
      method: 'PATCH',
      body: JSON.stringify(request.body.data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setEditCreateAddressResponse(data))
    .catch((err) => setError(err));
}

// Delete Address
function deleteAddress(request) {
  let status;
  return apiFetch(`${ADDRESSES}/${request.params.id}`,
    {
      method: 'DELETE'
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
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
