/**
 * Check if user token exists
 * @param req
 * @returns {boolean}
 */
function checkUserToken(req) {
  return Boolean(req.session && req.session.user_token);
}

/**
 * Set of helper methods based on session
 */
const SessionUtils = {
  isUser: (req) => checkUserToken(req),
  isGuest: (req) => (!checkUserToken(req)),
  setSession: (req, args) => {
    Object.entries(args).forEach(([key, val]) => {
      req.session[key] = val;
    });
  },
  checkGuestParams: (req) => {
    return Boolean(req.session && req.session.order && req.session.guest_token);
  }
};

export default SessionUtils;
