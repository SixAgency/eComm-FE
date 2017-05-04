import Promise from 'bluebird';
import { fetch } from '../fetch';
import { setSuccessResponse } from './response';
import ProductUtils from '../helpers/product';
import UrlUtils from '../helpers/url';

/**
 * Get Product by slug method
 * @param req
 * @returns {Promise}
 */
function getProduct(req) {
  try {
    const args = {
      url: UrlUtils.getProduct(req),
      method: 'GET',
      session: req.session
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Get Products method by all|filter given
 * @param req
 * @returns {Promise}
 */
function getProducts(req) {
  try {
    const args = {
      url: UrlUtils.getProducts(),
      method: 'GET',
      session: req.session,
      fn: (data) => {
        // Check filters and returned filtered products
        if (req.query.filter && req.query.value) {
          const products = ProductUtils.filterProducts({
            products: data.products,
            filter: req.query.filter,
            value: req.query.value
          });
          return setSuccessResponse(products);
        }
        // Return all the products
        return setSuccessResponse(data.products);
      }
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Get Products by Category
 * @param req
 * @returns {Promise}
 */
function getProductsByCategory(req) {
  try {
    const args = {
      url: UrlUtils.getProductsByCategory(req),
      method: 'GET',
      session: req.session,
      fn: (data) => setSuccessResponse(data.products)
    };
    return fetch(args);
  } catch (err) {
    return Promise.reject(err);
  }
}

export {
  getProduct,
  getProducts,
  getProductsByCategory
};
