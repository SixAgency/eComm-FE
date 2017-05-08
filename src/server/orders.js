import { apiFetch } from './fetch';
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

import { updateSession } from './session';

const ORDER = '/api/v1/orders';
const ORDERS = '/api/v1/orders/mine?q[state_cont_any][]=complete&q[state_cont_any][]=canceled';


// @TODO - we need to move cart vs session related functions

/**
 * Helper to determine guest/user session
 * @param session
 * @returns {boolean|*|null}
 */
function isGuest(session) {
  return !session.user_token;
}

function setSessionParams(request, data) {
  if (data.isError) {
    return data;
  }
  const session = request.session;
  const params = {
    initialized: session.initialized,
    user_token: session.user_token,
    order: data.number
  };
  if (isGuest(session)) {
    params.guest_token = data.token;
  }
  updateSession(request, params);
  return data;
}

function getOrderUrl(request) {
  if (request.query.guest_token) {
    return `${ORDER}/${request.params.number}?order_token=${request.query.guest_token}`;
  }
  if (request.session.guest_token) {
    return `${ORDER}/${request.params.number}?order_token=${request.session.guest_token}`;
  }
  return `${ORDER}/${request.params.number}`;
}

// Get Order Details
function getOrder(request) {
  let status;
  const endpoint = getOrderUrl(request);
  return apiFetch(endpoint, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setOrderResponse(data))
    .catch((err) => setError(err));
}

// Get User Orders
function getOrders(request) {
  let status;
  return apiFetch(ORDERS, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setOrdersResponse(data))
    .catch((err) => setError(err));
}

function createCart(request) {
  const empty = {
    order: {
      line_items: []
    }
  };
  let status;
  return apiFetch(ORDER, {
    method: 'POST',
    body: JSON.stringify(empty)
  }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .catch((err) => setError(err));
}

function checkCartExistence(data, request) {
  if (data.isError) {
    return data;
  }
  if (Object.getOwnPropertyNames(data).length === 0) {
    return createCart(request);
  }
  return data;
}

// Create Cart
function createCartWrapper(request) {
  return createCart(request)
    .then((resp) => setSessionParams(request, resp))
    .then((resp) => setCartResponse(resp))
    .catch((err) => setError(err));
}

// Get Cart
function getCart(request) {
  let status;
  let endpoint = '/api/v1/orders/current';
  if (!request.session.user_token) {
    endpoint = `/api/v1/orders/${request.session.order}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((resp) => checkCartExistence(resp, request))
    .then((resp) => setSessionParams(request, resp))
    .then((data) => setCartResponse(data))
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
  if (typeof request.body.options !== 'undefined') {
    item.line_item.options = request.body.options;
  }

  const orderNumber = request.session.order;
  let status;
  let endpoint = `${ORDER}/${orderNumber}/line_items`;
  if (!request.session.user_token) {
    endpoint = `${ORDER}/${orderNumber}/line_items?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'POST',
      body: JSON.stringify(item)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => getCartCallback(data, request, setAddRemoveCartResponse))
    .catch((err) => setError(err));
}

// Remove Item from Cart
function removeFromCart(request) {
  const { id, name } = request.body;
  const orderNumber = request.session.order;
  let endpoint = `${ORDER}/${orderNumber}/line_items/${id}`;
  let status;
  if (!request.session.user_token) {
    endpoint = `${ORDER}/${orderNumber}/line_items/${id}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'DELETE'
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => {
      const item = data;
      item.name = name;
      return getCartCallback(data, request, setAddRemoveCartResponse);
    })
    .catch((err) => setError(err));
}

// Update Cart
function updateCart(request) {
  let status;
  const postdata = request.body.data;
  const orderNumber = request.session.order;
  let endpoint = `${ORDER}/${orderNumber}`;
  if (!request.session.user_token) {
    endpoint = `${ORDER}/${orderNumber}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT',
      body: JSON.stringify(postdata)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

// Apply Coupon code
function applyCouponCode(request) {
  let status;
  const postdata = request.body;
  let endpoint = `${ORDER}/${request.session.order}/apply_coupon_code`;
  if (!request.session.user_token) {
    endpoint = `${ORDER}/${request.session.order}/apply_coupon_code?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PUT',
      body: JSON.stringify(postdata)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCouponResponse(data))
    .catch((err) => setError(err));
}

// Update Cart
function calculateShipping(request) {
  let status;
  const postdata = request.body.data;
  const orderNumber = request.session.order;
  let endpoint = `${ORDER}/${orderNumber}/calculate_shipping`;
  if (!request.session.user_token) {
    endpoint = `${ORDER}/${orderNumber}/calculate_shipping?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PATCH',
      body: JSON.stringify(postdata)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

// Apply Store Credit
function applyStoreCredit(request) {
  let status;
  const postdata = request.body;
  const orderNumber = request.session.order;
  let endpoint = `/api/v1/checkouts/${orderNumber}?order_token=${request.session.user_token}`;
  if (!request.session.user_token) {
    endpoint = `/api/v1/checkouts/${orderNumber}?order_token=${request.session.guest_token}`;
  }
  return apiFetch(endpoint,
    {
      method: 'PATCH',
      body: JSON.stringify(postdata)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setCartResponse(data))
    .catch((err) => setError(err));
}

export {
  createCartWrapper,
  getOrder,
  getOrders,
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  applyCouponCode,
  calculateShipping,
  applyStoreCredit
};
