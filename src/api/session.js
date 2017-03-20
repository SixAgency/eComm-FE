import { getCart, createCartWrapper } from './orders';
import logger from './logger';

/* eslint-disable no-param-reassign */
function initSession(session) {
  logger.info('START-SESSION');
  logger.info(session);
  logger.info('END-SESSION');
  if (session && !session.initialized) {
    session.initialized = true;
    session.guest_token = null;
    session.user_token = null;
    session.order = null;
  }
}

function resetCartSession(session, isNew) {
  if (isNew && isNew !== 'false') {
    console.log('here');
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
  request.session = params;
}

/**
 * Clear the session
 * @param request
 * @returns {null}
 */
function clearSession(request) {
  request.session = null;
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
  initSession(request.session);
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
