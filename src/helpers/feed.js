import { DEFAULT_VALUES } from '../constants/StateConsts';

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
      }
    };
  }
  return response;
}

function mapAddressFeedToState(address) {
  if (address) {
    return {
      id: address.id,
      firstname: address.firstname || '',
      lastname: address.lastname || '',
      company: address.company || '',
      phone: address.phone || '',
      address1: address.address1 || '',
      address2: address.address2 || '',
      city: address.city || '',
      state: address.state_id || 0,
      country: address.country_id || 232,
      zip: address.zipcode || ''
    };
  }
  return DEFAULT_VALUES.address;
}

function mapAddressStateToFeed(address) {
  return {
    firstname: address.firstname,
    lastname: address.lastname,
    company: address.company,
    phone: address.phone,
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    state_id: address.state,
    country_id: address.country,
    zipcode: address.zip
  };
}

function setCheckoutAddressFeed(data) {
  return {
    id: data.id,
    address: mapAddressStateToFeed(data.address)
  };
}

function setCheckoutAddressesFeed(data) {
  return {
    order: {
      email: data.email,
      note: data.note,
      bill_address_attributes: mapAddressStateToFeed(data.billing),
      ship_address_attributes: mapAddressStateToFeed(data.shipping)
    }
  };
}

export {
  getCartAddresses,
  getCheckoutAddresses,
  setCheckoutAddressesFeed,
  setCheckoutAddressFeed,
  mapAddressFeedToState,
  mapAddressStateToFeed
};
