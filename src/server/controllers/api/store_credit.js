import { sendSuccessResponse, sendErrorResponse } from '../../proxy/response';
import { getStoreCredit, applyStoreCredit, redeemStoreCredit } from '../../proxy/store_credit';

/**
 * Get Store credit
 * @param req
 * @param resp
 */
function onGetStoreCredit(req, resp) {
  getStoreCredit(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

/**
 * Redeem Store credit
 * @param req
 * @param resp
 */
function onRedeemStoreCredit(req, resp) {
  redeemStoreCredit(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

/**
 * Use store credit
 * @param req
 * @param resp
 */
function onApplyStoreCredit(req, resp) {
  applyStoreCredit(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

export { onGetStoreCredit, onRedeemStoreCredit, onApplyStoreCredit };
