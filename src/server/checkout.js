import { apiFetch } from './fetch';
// Helpers
import {
  checkResponse,
  setError,
  setBraintreeResponse,
  setCartResponse,
  setAddressResponse
} from './helpers/handlers';

function getBraintreeTokens(request) {
  let status;
  return apiFetch('/api/v1/braintree_client_token',
    {
      method: 'POST'
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setBraintreeResponse(data))
    .catch((err) => setError(err));
}

function checkoutPayPal(request) {
  let status;
  let endpoint = `/api/v1/checkouts/${request.session.order}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PATCH',
      body: JSON.stringify(request.body.data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

function checkoutNext(request) {
  let status;
  let endpoint = `/api/v1/checkouts/${request.session.order}/next`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}/next?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT'
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

function checkoutAddresses(request) {
  let status;
  let endpoint = `/api/v1/checkouts/${request.session.order}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT',
      body: JSON.stringify({ order: request.body.order })
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

function checkoutAddress(request) {
  let status;
  let endpoint = `/api/v1/checkouts/${request.session.order}/addresses/${request.body.id}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}/addresses/${request.body.id}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PATCH',
      body: JSON.stringify({ address: request.body.address })
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => {
      if (data.isError) {
        return {
          isError: true,
          messages: data.messages || ['Error.'],
          status: data.status,
          address: {}
        };
      }
      return setAddressResponse(data);
    })
    .catch((err) => setError(err));
}


export { getBraintreeTokens, checkoutPayPal, checkoutNext, checkoutAddress, checkoutAddresses };
