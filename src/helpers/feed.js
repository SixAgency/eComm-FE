function getAddressesFromCart(cart) {
  const addresses = {
    billing: null,
    shipping: null,
  };

  if (!cart.isEmpty && (cart.state !== 'cart' || cart.state !== 'address')) {
    if (cart.bill_address) {
      addresses.billing = cart.bill_address.selected_address_id;
    }
    if (cart.ship_address) {
      addresses.billing = cart.ship_address.selected_address_id;
    }
  }

  return addresses;
}

export default getAddressesFromCart;
