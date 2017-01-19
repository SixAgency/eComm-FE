import { apiFetch } from '../core/fetch';
import { parseError, parseResponse, parseCart } from './handlers';
import conslog from '../utils/dev';
import { faketoken } from '../config';

const ORDER = '/api/v1/orders';
const CART = '/api/v1/orders/current';

// Create Order
function createOrder(request) {
  const response = apiFetch('/api/v1/orders',
    {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  return response;
}

// Get Order Details
function getOrder(request) {
  const number = request.query.order_number;
  const response = apiFetch(`${ORDER}/${number}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => (data))
  .catch((err) => parseError(err));
  return response;
}

// Get Cart
function getCart(request) {
  conslog('SESSION', request.session);
  const response = apiFetch(CART, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => parseCart(data, request))
  .catch((err) => parseError(err));
  return response;
}

// Add Item to Cart
function addToCart(request) {
  conslog(request.session);
  const item = {
    line_item: {
      variant_id: request.body.id,
      quantity: request.body.quantity,
    },
  };
  conslog(item);
  const orderNumber = request.session.orderNumber;
  const response = apiFetch(`${ORDER}/${orderNumber}/line_items`,
    {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  return response;
}

// Remove Item from Cart
function removeFromCart(request) {
  const id = request.body.id;
  const orderNumber = request.session.orderNumber;
  const response = apiFetch(`${ORDER}/${orderNumber}/line_items/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  return response;
}

// TODO - user orders
export { getOrder, getCart, addToCart, createOrder, removeFromCart };
