import { fetch } from '../fetch';
import { setSuccessResponse, setErrorResponse } from './response';
import CartUtils from '../helpers/cart';
import SessionUtils from '../helpers/session';
import UrlUtils from '../helpers/url';
import { NOT_FOUND } from '../../constants/MessageConsts';

/**
 * Returns the cart of a logged in customer
 * @param req
 * @returns {Promise}
 */
function getUserCart(req) {
  const args = {
    url: '/api/v1/orders/current',
    method: 'GET',
    session: req.session,
    fn: (cart) => {
      if (CartUtils.checkCart(cart)) {
        CartUtils.setCartSession(req, cart);
        return setSuccessResponse(cart);
      }
      return setErrorResponse({ status: 404, messages: [NOT_FOUND] });
    }
  };
  return fetch(args);
}

/**
 * Returns the cart of a guest user
 * @param req
 * @returns {Promise}
 */
function getGuestCart(req) {
  const args = {
    url: `/api/v1/orders/${req.session.order}?order_token=${req.session.guest_token}`,
    method: 'GET',
    session: req.session,
    fn: (cart) => {
      CartUtils.setCartSession(req, cart);
      return setSuccessResponse(cart);
    }
  };
  return fetch(args);
}

/**
 * Get Cart Method
 * @param req
 * @returns {Promise}
 */
function getCart(req) {
  if (SessionUtils.isUser(req)) {
    return getUserCart(req);
  }
  return getGuestCart(req);
}

/**
 * Create Cart Method
 * @param req
 * @returns {Promise}
 */
function createCart(req) {
  const args = {
    url: '/api/v1/orders',
    method: 'POST',
    body: CartUtils.createCartParams(),
    session: req.session,
    fn: (cart) => {
      CartUtils.setCartSession(req, cart);
      return setSuccessResponse(cart);
    }
  };
  return fetch(args);
}

/**
 * Add to Cart Method
 * @param req
 * @returns {Promise}
 */
function addToCart(req) {
  const args = {
    url: UrlUtils.addToCart(req),
    method: 'POST',
    body: CartUtils.addToCartParams(req),
    session: req.session
  };
  return fetch(args);
}

/**
 * Remove from Cart Method
 * @param req
 * @returns {Promise}
 */
function removeFromCart(req) {
  const args = {
    url: UrlUtils.removeFromCart(req),
    method: 'DELETE',
    session: req.session
  };
  return fetch(args);
}

/**
 * Update Cart
 * @param req
 * @returns {Promise}
 */
function updateCart(req) {
  const args = {
    url: UrlUtils.updateCart(req),
    method: 'PUT',
    body: CartUtils.updateCartParams(req),
    session: req.session
  };
  return fetch(args);
}

export {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  updateCart
};
