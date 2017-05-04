import { sendSuccessResponse, sendErrorResponse } from '../../proxy/response';
import { getCart, createCart, addToCart, removeFromCart, updateCart } from '../../proxy/cart';

/**
 * Get User/Guest cart handler
 * @param req
 * @param resp
 */
function onGetCart(req, resp) {
  getCart(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}
/**
 * Create a new cart handler
 * @param req
 * @param resp
 */
function onCreateCart(req, resp) {
  createCart(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}
/**
 * Add Item to cart handler
 * @param req
 * @param resp
 */
function onAddToCart(req, resp) {
  addToCart(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}
/**
 * Remove Item from the cart handler
 * @param req
 * @param resp
 */
function onRemoveFromCart(req, resp) {
  removeFromCart(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}
/**
 * Update cart handler
 * @param req
 * @param resp
 */
function onUpdateCart(req, resp) {
  updateCart(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

export {
  onGetCart,
  onCreateCart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCart
};
