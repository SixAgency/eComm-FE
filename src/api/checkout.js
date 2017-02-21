import { apiFetch } from '../core/fetch';
// Helpers
import {
  checkResponse,
  setError,
  setBraintreeResponse,
  setCartResponse,
  setAddressCallBack
} from './helpers/handlers';

import { faketoken } from '../config';
import conslog from '../utils/dev';

function getBraintreeTokens(request) {
  return apiFetch('/api/v1/braintree_client_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
    .then((response) => checkResponse(response))
    .then((data) => setBraintreeResponse(data))
    .catch((err) => setError(err));
}

function checkoutPayPal(request) {
  conslog('data', request.body.data);
  return apiFetch(`/api/v1/orders/${request.session.orderNumber}`,
    {
      method: 'PUT',
      body: JSON.stringify(request.body.data),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
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
        'X-Spree-Token': request.session.token || faketoken
      }
    })
    .then((response) => checkResponse(response))
    .then((data) => setCartResponse(data, request, () => (true)))
    .catch((err) => setError(err));
}

function checkoutAddress(request) {
  const order = {
    order: request.body.order
  };
  const isPayPal = request.body.isPayPal;
  return apiFetch(`/api/v1/checkouts/${request.session.orderNumber}`,
    {
      method: 'PUT',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
    .then((response) => checkResponse(response))
    .then((data) => setAddressCallBack(request, data, isPayPal, checkoutNext))
    .catch((err) => setError(err));
}


export { getBraintreeTokens, checkoutPayPal, checkoutNext, checkoutAddress };
