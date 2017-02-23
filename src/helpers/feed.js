function getCartAddresses(cart) {
  const addresses = {
    billing: null,
    shipping: null
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

function getCheckoutAddresses(data) {
  let billing = null;
  let shipping = null;
  data.addresses.forEach((address) => {
    if (address.id === data.billing) {
      billing = address;
    }
    if (address.id === data.shipping) {
      shipping = address;
    }
  });
  let response = {
    isError: true,
    messages: ['Billing and shipping addresses are not set.']
  };
  if (billing && shipping) {
    delete shipping.id;
    delete shipping.user_id;
    delete shipping.isShipping;
    delete shipping.isBilling;
    delete billing.id;
    delete billing.user_id;
    delete billing.isShipping;
    delete billing.isBilling;
    response = {
      isError: false,
      order: {
        bill_address_attributes: billing,
        ship_address_attributes: shipping
      },
      isPayPal: data.isPayPal
    };
  }
  return response;
}

export { getCartAddresses, getCheckoutAddresses };
