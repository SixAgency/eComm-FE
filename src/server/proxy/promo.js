import Promise from 'bluebird';
import { fetch } from '../fetch';
import UrlUtils from '../helpers/url';

/**
 * Apply promo method
 * @param req
 * @returns {Promise}
 */
function applyPromo(req) {
  try {
    const args = {
      url: UrlUtils.applyPromo(req),
      method: 'PUT',
      body: req.body,
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

export default applyPromo;
