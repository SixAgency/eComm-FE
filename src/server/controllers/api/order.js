import { sendSuccessResponse, sendErrorResponse } from '../../proxy/response';
import { getOrder, getOrders } from '../../proxy/order';

/**
 * Get Order handler
 * @param req
 * @param resp
 */
function onGetOrder(req, resp) {
  getOrder(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

/**
 * Get Orders handlers
 * @param req
 * @param resp
 */
function onGetOrders(req, resp) {
  getOrders(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

export { onGetOrder, onGetOrders };
