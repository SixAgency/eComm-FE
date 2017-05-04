import { sendSuccessResponse, sendErrorResponse } from '../../proxy/response';
import applyPromo from '../../proxy/promo';

/**
 * Apply Promo handler
 * @param req
 * @param resp
 */
function onApplyPromo(req, resp) {
  applyPromo(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

export default onApplyPromo;
