import { getCart, createCartWrapper } from './orders';
import logger from './logger';

/* eslint-disable no-param-reassign */
function resetCartSession(session, isNew) {
  console.log(session);
  if (isNew && isNew !== 'false') {
    session.order = null;
    session.guest_token = null;
  }
}

/**
 * Set the session with the given params
 * @param request
 * @param params
 * @returns {{params: *}}
 */
function updateSession(request, params) {
  request.session.guest_token = params.guest_token;
  request.session.user_token = params.user_token;
  request.session.order = params.order;
}

/**
 * Clear the session
 * @param request
 * @returns {null}
 */
function clearSession(request) {
  request.session.destroy((err) => {
    console.error(err);
  });
}
/* eslint-enable no-param-reassign */

/**
 * Check if session exists
 * @param request
 * @returns bool
 */
function checkSessionOrder(session) {
  return (session.order && session.guest_token) || session.user_token;
}

/**
 * Returns the cart.
 * The cart id & token represents the guest & and
 * registered user session.
 * This function is responsible to check
 * and create cart if not exists (session).
 * @param request
 */
function getSession(request) {
  resetCartSession(request.session, request.params.new);
  if (checkSessionOrder(request.session)) {
    logger.info('Existing cart.');
    return getCart(request);
  }
  logger.info('Create new cart.');
  return createCartWrapper(request);
}

export {
  getSession,
  updateSession,
  clearSession
};
