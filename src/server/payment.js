import { apiFetch } from './fetch/fetch.server';
import {
  checkResponse,
  setError,
  setCartResponse
} from './helpers/handlers';

/**
 * Set square as payment method
 * @param request
 * @returns {Promise.<T>|Promise<R>}
 */
function checkoutSquare(request) {
  let status;
  let endpoint = `/api/v1/checkouts/${request.session.order}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT',
      body: JSON.stringify(request.body.data)
    }, request.session
  )
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

/**
 * Reset the order back to cart state
 * @param request
 */
function resetOrder(request) {
  let status;
  return fetch(`/api/v1/checkouts/${request.session.order}/reset?order_token=${request.session.guest_token}`,
    {
      method: 'PUT'
    }, request.session
  )
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

/**
 * Finalize the order
 * @param request
 */
function checkoutConfirm(request) {
  let status;
  let endpoint = `/api/v1/checkouts/${request.session.order}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT'
    }, request.session
  )
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

export {
  checkoutSquare,
  resetOrder,
  checkoutConfirm
};

