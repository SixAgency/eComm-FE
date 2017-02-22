function getCheckoutBilling(cart, addresses) {
  if ((cart.cart.state !== 'cart' || cart.cart.state !== 'address')) {
    const { isEmpty } = addresses.billing.isEmpty;
    if (isEmpty) {
      return 0;
    }
    return addresses.billing.address.id;
  }
  return cart.cart.bill_address.selected_address_id;
}

function getCheckoutShipping(cart, addresses) {
  if ((cart.cart.state !== 'cart' || cart.cart.state !== 'address')) {
    const { isEmpty } = addresses.shipping.isEmpty;
    if (isEmpty) {
      return 0;
    }
    return addresses.shipping.address.id;
  }
  return cart.cart.ship_address.selected_address_id;
}

export { getCheckoutBilling, getCheckoutShipping };
