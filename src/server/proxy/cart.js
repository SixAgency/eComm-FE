import Promise from 'bluebird';
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
    url: UrlUtils.getUserCart(),
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
    url: UrlUtils.getGuestCart(req),
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
  try {
    if (SessionUtils.isUser(req)) {
      return getUserCart(req);
    }
    return getGuestCart(req);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Create Cart Method
 * @param req
 * @returns {Promise}
 */
function createCart(req) {
  try {
    const args = {
      url: UrlUtils.createCart(),
      method: 'POST',
      body: CartUtils.createCartParams(),
      session: req.session,
      fn: (cart) => {
        CartUtils.setCartSession(req, cart);
        return setSuccessResponse(cart);
      }
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Add to Cart Method
 * @param req
 * @returns {Promise}
 */
function addToCart(req) {
  try {
    const args = {
      url: UrlUtils.addToCart(req),
      method: 'POST',
      body: CartUtils.addToCartParams(req),
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Remove from Cart Method
 * @param req
 * @returns {Promise}
 */
function removeFromCart(req) {
  try {
    const args = {
      url: UrlUtils.removeFromCart(req),
      method: 'DELETE',
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Update Cart
 * @param req
 * @returns {Promise}
 */
function updateCart(req) {
  try {
    const args = {
      url: UrlUtils.updateCart(req),
      method: 'PUT',
      body: CartUtils.updateCartParams(req),
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

export {
  getCart,
  createCart,
  addToCart,
  removeFromCart,
  updateCart
};
