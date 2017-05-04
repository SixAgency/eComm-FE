import Promise from 'bluebird';
import { fetch } from '../fetch';
import UrlUtils from '../helpers/url';

/**
 * Get store credit method
 * @param req
 * @returns {Promise}
 */
function getStoreCredit(req) {
  try {
    const args = {
      url: UrlUtils.getStoreCredit(),
      method: 'GET',
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Redeem store credit method
 * @param req
 * @returns {Promise}
 */
function redeemStoreCredit(req) {
  try {
    const args = {
      url: UrlUtils.redeemStoreCredit(),
      method: 'POST',
      body: req.body,
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Use store credit method
 * @param req
 * @returns {Promise}
 */
function applyStoreCredit(req) {
  try {
    const args = {
      url: UrlUtils.applyStoreCredit(req),
      method: 'PATCH',
      body: req.body,
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getStoreCredit, redeemStoreCredit, applyStoreCredit };
