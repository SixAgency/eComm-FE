import { sendSuccessResponse, sendErrorResponse } from '../../proxy/response';
import getSession from '../../proxy/session';

/**
 * Check session handler
 * @param req
 * @param resp
 */
function onGetSession(req, resp) {
  getSession(req)
    .then(data => sendSuccessResponse(resp, data))
    .catch(err => sendErrorResponse(resp, err));
}

/**
 * Clear session handler
 * @param req
 * @param resp
 */
function clearSession(req, resp) {
  console.log('not implemented');
}

export {
  onGetSession,
  clearSession
};
