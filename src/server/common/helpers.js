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
 * Helper method - please keep here
 */
function check() {
  console.log('test');
}

export {
  isPayPal,
  check
};
