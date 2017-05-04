/**
 * Check if the payment method is PayPal
 * @param cart
 * @returns {boolean}
 */
function isPayPal(cart) {
  const paypal = cart.payments.filter((method) => (method.payment_method.name === 'Paypal'));
  return (paypal.length > 0);
}

/**
 * Check if user or guest
 *
 * @param req
 * @returns {boolean}
 */
function isUser(req) {
  return Boolean(req.session.user_token);
}

export {
  isPayPal,
  isUser
};
