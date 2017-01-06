import { apiFetch } from '../core/fetch';
import { parseError, parseResponse, parseCart } from './handlers';

const ORDER = '/api/orders';
const CART = '/api/orders/current';

/* @TODO - token & ordernumber */
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';
// const orderNumber = 'R540018862';

// Get Order Details
function getOrder(request) {
  const number = request.query.order_number;
  const response = apiFetch(`${ORDER}/${number}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || token,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => (data))
  .catch((err) => parseError(err));
  return response;
}

// Get Cart
function getCart(request) {
  const response = apiFetch(CART, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || token,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => parseCart(data))
  .catch((err) => parseError(err));
  return response;
}

// TODO - user orders
export { getOrder, getCart };
