import requestWrapper from './request';
import { updateSession } from './session';

/**
 * +++++++++++++++++++++++++++
 *      HELPER FUNCTIONS
 * +++++++++++++++++++++++++++
 */
function formatCart(response) {
  console.log(response.isEmpty);
  return {
    isError: response.isError,
    isEmpty: response.isEmpty || response.data.line_items.length === 0,
    data: response.data
  };
}

/**
 *
 * Handler function
 * Going to set the session
 * based on cart.
 * Return formatted cart as response
 *
 * @param request
 * @param data
 * @returns {*}
 */
function setCartAndSession(request, response) {
  const params = {
    initialized: request.session.initialized,
    user_token: request.session.user_token,
    guest_token: response.data.token,
    order: response.data.number
  };
  updateSession(request, params);
  return formatCart(response);
}

/**
 * Set the cart endpoint based on user type
 * @param request
 * @returns {*}
 */
function getCartEndPoint(request) {
  if (request.session.user_token) {
    return '/api/orders/current';
  }
  return `/api/orders/${request.session.order}?order_token=${request.session.guest_token}`;
}

/**
 * Create cart
 * @param request
 */
function createCart(request) {
  const params = {
    url: '/api/v1/orders',
    method: 'POST',
    data: {
      order: {
        line_items: []
      }
    }
  };
  return requestWrapper(request, params, setCartAndSession);
}

function checkCartResponse(request, response) {
  if (response.isEmpty) {
    return createCart(request);
  }
  return setCartAndSession(request, response);
}

/**
 * Get cart wrapper
 * @param request
 */
function getCart(request) {
  const params = {
    url: getCartEndPoint(request),
    method: 'GET',
    data: {}
  };
  return requestWrapper(request, params, checkCartResponse);
}

/**
 * +++++++++++++++++++++++++++
 *    API ENDPOINT HANDLERS
 * +++++++++++++++++++++++++++
 */

/**
 * Add to Cart
 * @param request
 */
function addToCart(request) {
  const params = {
    url: '/api/v1/orders/current',
    method: 'GET',
    data: {}
  };
  return requestWrapper(request, params, formatCart);
}

/**
 * Remove from Cart
 * @param request
 */
function removeFromCart(request) {
  const params = {
    url: '/api/v1/orders/current',
    method: 'GET',
    data: {}
  };
  return requestWrapper(request, params, formatCart);
}

/**
 * Update the Cart
 * @param request
 */
function updateCart(request) {
  const params = {
    url: '/api/v1/orders/current',
    method: 'GET',
    data: {}
  };
  return requestWrapper(request, params, formatCart);
}

export {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  updateCart
};
