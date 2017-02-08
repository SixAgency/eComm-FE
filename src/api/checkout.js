import { apiFetch } from '../core/fetch';
// Helpers
import {
  checkResponse,
  setError,
  setBraintreeResponse,
  setCartResponse,
} from './helpers/handlers';

import { faketoken } from '../config';


function getBraintreeTokens(request) {
  return apiFetch('/api/v1/braintree_client_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((response) => checkResponse(response))
    .then((data) => setBraintreeResponse(data))
    .catch((err) => setError(err));
}

function checkoutPayPal(request) {
  return apiFetch(`/api/v1/orders/${request.session.orderNumber}`,
    {
      method: 'PUT',
      body: JSON.stringify(request.body.order),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((response) => checkResponse(response))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

function checkoutNext(request) {
  return apiFetch(`/api/v1/checkouts/${request.session.orderNumber}/next`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((response) => checkResponse(response))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

export { getBraintreeTokens, checkoutPayPal, checkoutNext };
