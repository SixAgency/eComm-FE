import fetch from './fetch';
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
  return fetch(`/api/v1/checkouts${request.session.order}`,
    {
      method: 'PUT',
      body: JSON.stringify(request.data)
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

export {
  checkoutSquare,
  checkoutPayPal
};

