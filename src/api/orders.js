import { apiFetch } from '../core/fetch';
// Helpers
import {
  checkResponse,
  setError,
  setOrderResponse,
  setOrdersResponse,
  setCartResponse,
  setAddRemoveCartResponse,
  setCouponResponse
} from './helpers/handlers';

import { faketoken } from '../config';

import conslog from '../utils/dev';

const ORDER = '/api/v1/orders';
const ORDERS = '/api/v1/orders/mine?q[state_cont]=complete&q[state_cont]=canceled';
const CART = '/api/v1/orders/current';

// Get Order Details
function getOrder(request) {
  const number = request.params.number;
  return apiFetch(`${ORDER}/${number}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken
    }
  })
  .then((response) => checkResponse(response))
  .then((data) => setOrderResponse(data))
  .catch((err) => setError(err));
}

// Get User Orders
function getOrders(request) {
  return apiFetch(ORDERS, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken
    }
  })
  .then((response) => checkResponse(response))
  .then((data) => setOrdersResponse(data))
  .catch((err) => setError(err));
}

// Create Cart
function createCart(request) {
  const empty = {
    order: {
      line_items: []
    }
  };
  return apiFetch(ORDER, {
    method: 'POST',
    body: JSON.stringify(empty),
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken
    }
  })
  .then((resp) => checkResponse(resp))
  .then((resp) => setCartResponse(resp, request))
  .catch((err) => setError(err));
}

// Get Cart
function getCart(request) {
  return apiFetch(CART, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken
    }
  })
  .then((response) => checkResponse(response))
  .then((data) => setCartResponse(data, request, createCart))
  .catch((err) => setError(err));
}

// Get the Cart after interactions like add, remove or update
function getCartCallback(data, request, callback) {
  return getCart(request)
    .then((cart) => {
      const resp = {
        item: data,
        cart
      };
      return callback(resp);
    })
    .catch((err) => setError(err));
}

// Add to Cart
function addToCart(request) {
  const item = {
    line_item: {
      variant_id: request.body.id,
      quantity: request.body.quantity
    }
  };
  const orderNumber = request.session.orderNumber;
  return apiFetch(`${ORDER}/${orderNumber}/line_items`,
    {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
  .then((response) => checkResponse(response))
  .then((data) => getCartCallback(data, request, setAddRemoveCartResponse))
  .catch((err) => setError(err));
}

// Remove Item from Cart
function removeFromCart(request) {
  const { id, name } = request.body;
  const orderNumber = request.session.orderNumber;
  return apiFetch(`${ORDER}/${orderNumber}/line_items/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
  .then((response) => checkResponse(response))
  .then((data) => {
    const item = data;
    item.name = name;
    return getCartCallback(data, request, setAddRemoveCartResponse);
  })
  .catch((err) => setError(err));
}

// Update Cart
function updateCart(request) {
  const postdata = request.body.data;
  const orderNumber = request.session.orderNumber;
  return apiFetch(`${ORDER}/${orderNumber}`,
    {
      method: 'PUT',
      body: JSON.stringify(postdata),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
  .then((response) => checkResponse(response))
  .then((data) => setCartResponse(data, request, () => (true)))
  .catch((err) => setError(err));
}

// Apply Coupon code
function applyCouponCode(request) {
  const postdata = request.body.data;
  const orderNumber = request.session.orderNumber;
  return apiFetch(`${ORDER}/${orderNumber}/apply_coupon_code`,
    {
      method: 'PUT',
      body: JSON.stringify(postdata),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
  .then((response) => checkResponse(response))
  .then((data) => setCouponResponse(data))
  .catch((err) => setError(err));
}

// Update Cart
function calculateShipping(request) {
  const postdata = request.body.data;
  const orderNumber = request.session.orderNumber;
  conslog('postdata', postdata);
  return apiFetch(`${ORDER}/${orderNumber}/calculate_shipping`,
    {
      method: 'PATCH',
      body: JSON.stringify(postdata),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken
      }
    })
  .then((response) => checkResponse(response))
  .then((data) => setCartResponse(data, request, () => (true)))
  .catch((err) => setError(err));
}

export {
  getOrder,
  getOrders,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  applyCouponCode,
  calculateShipping
};
