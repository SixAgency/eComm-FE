import { sendSuccessResponse, sendErrorResponse } from '../../proxy/response';
import { getProduct, getProducts, getProductsByCategory } from '../../proxy/product';

/**
 * Get Product handler
 * @param req
 * @param resp
 */
function onGetProduct(req, resp) {
  getProduct(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

/**
 * Get Products handler
 * @param req
 * @param resp
 */
function onGetProducts(req, resp) {
  getProducts(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

/**
 * Get Products by Category handler
 * @param req
 * @param resp
 */
function onGetProductByCategory(req, resp) {
  getProductsByCategory(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

export {
  onGetProduct,
  onGetProducts,
  onGetProductByCategory
};
