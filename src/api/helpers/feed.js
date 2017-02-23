function getCheckoutBilling(cart, addresses) {
  if ((cart.cart.state !== 'cart' || cart.cart.state !== 'address')) {
    const { isEmpty } = addresses.billing.isEmpty;
    if (isEmpty) {
      return 0;
    }
    return addresses.billing.address.id;
  }
  return 0;
  // Don't delete - we need once the backend is fixed
  // return cart.cart.bill_address.selected_address_id;
}

function getCheckoutShipping(cart, addresses) {
  if ((cart.cart.state !== 'cart' || cart.cart.state !== 'address')) {
    const { isEmpty } = addresses.shipping.isEmpty;
    if (isEmpty) {
      return 0;
    }
    return addresses.shipping.address.id;
  }
  return 0;
  // Don't delete - we need once the backend is fixed
  // return cart.cart.ship_address.selected_address_id;
}

export { getCheckoutBilling, getCheckoutShipping };
