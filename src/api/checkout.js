import { apiFetch } from './fetch';
// Helpers
import {
  checkResponse,
  setError,
  setBraintreeResponse,
  setCartResponse,
  setAddressCallBack
} from './helpers/handlers';

function getBraintreeTokens(request) {
  return apiFetch('/api/v1/braintree_client_token',
    {
      method: 'POST'
    }, request.session)
    .then((response) => checkResponse(response))
    .then((data) => setBraintreeResponse(data))
    .catch((err) => setError(err));
}

function checkoutPayPal(request) {
  let endpoint = `/api/v1/checkouts/${request.session.order}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PATCH',
      body: JSON.stringify(request.body.data)
    }, request.session)
    .then((response) => checkResponse(response))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

function checkoutNext(request) {
  let endpoint = `/api/v1/checkouts/${request.session.order}/next`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}/next?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT'
    }, request.session)
    .then((response) => checkResponse(response))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

function checkoutAddress(request) {
  const order = {
    order: request.body.order
  };
  const isPayPal = request.body.isPayPal;
  return apiFetch(`/api/v1/checkouts/${request.session.order}`,
    {
      method: 'PUT',
      body: JSON.stringify(order)
    }, request.session)
    .then((response) => checkResponse(response))
    .then((data) => setAddressCallBack(request, data, isPayPal, checkoutNext))
    .catch((err) => setError(err));
}


export { getBraintreeTokens, checkoutPayPal, checkoutNext, checkoutAddress };
