import { sendSuccessResponse, sendErrorResponse, setErrorResponse } from './proxy/response';
import { CART_ERROR, BAD_REQUEST, VALIDATION } from '../constants/MessageConsts';
/**
 * Check if cart exists middleware
 */
function checkCart(req, resp, next) {
  try {
    if (req.session.order && (req.session.user_token || req.session.guest_token)) {
      return next();
    }
    return sendSuccessResponse(resp, setErrorResponse({ status: 422, messages: [CART_ERROR] }));
  } catch (err) {
    return sendErrorResponse(resp, err);
  }
}

/**
 * Check apply promo fields
 */
function checkPromoCode(req, resp, next) {
  try {
    if (typeof req.body.coupon_code === 'string' && req.body.coupon_code) {
      return next();
    }
    // By default is bad request
    let data = { status: 400, messages: [BAD_REQUEST] };
    // if coupon code is empty string - return required message
    if (req.body.coupon_code === '') {
      data = { status: 422, messages: [VALIDATION.promo.required] };
    }
    return sendSuccessResponse(resp, setErrorResponse(data));
  } catch (err) {
    return sendErrorResponse(resp, err);
  }
}

/**
 * Check redeem store credit fields
 */
function checkStoreCreditCode(req, resp, next) {
  try {
    if (typeof req.body.redemption_code === 'string' && req.body.redemption_code) {
      return next();
    }
    // By default is bad request
    let data = { status: 400, messages: [BAD_REQUEST] };
    // if redemption code is empty string - return required message
    if (req.body.redemption_code === '') {
      data = { status: 422, messages: [VALIDATION.credit.required] };
    }
    return sendSuccessResponse(resp, setErrorResponse(data));
  } catch (err) {
    return sendErrorResponse(resp, err);
  }
}

/**
 * Check redeem store credit fields
 */
function checkStoreCreditApply(req, resp, next) {
  try {
    if (typeof req.body.apply_store_credit === 'boolean') {
      return next();
    }
    // Bad request
    return sendSuccessResponse(resp, setErrorResponse({ status: 400, messages: [BAD_REQUEST] }));
  } catch (err) {
    return sendErrorResponse(resp, err);
  }
}

export { checkCart, checkPromoCode, checkStoreCreditCode, checkStoreCreditApply };
