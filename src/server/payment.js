import { apiFetch } from './fetch';
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
    .then((resp) => checkResponse(resp))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

/**
 * @TODO - Move PayPal checkout here
 * @param request
 */
function checkoutPayPal(request) {
  console.log('PayPal', request.session);
}

/**
 * Finalize the order
 * @param request
 */
function checkoutConfirm(request) {
  let endpoint = `/api/v1/checkouts/${request.session.order}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT'
    }, request.session
  )
    .then((resp) => checkResponse(resp))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

export {
  checkoutSquare,
  checkoutPayPal,
  checkoutConfirm
};

