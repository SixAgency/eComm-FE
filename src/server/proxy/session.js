import Promise from 'bluebird';
import SessionUtils from '../helpers/session';
import { setSuccessResponse } from './response';

/**
 * Check if the user is logged in or not based on session
 * @param req
 * @returns Promise
 */
function onGetSession(req) {
  return new Promise((resolve, reject) => {
    try {
      resolve(setSuccessResponse({
        isUser: SessionUtils.isUser(req),
        isGuest: SessionUtils.isGuest(req)
      }));
    } catch (err) {
      reject(err);
    }
  });
}

export default onGetSession;
