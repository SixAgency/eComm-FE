import Promise from 'bluebird';
import { mannequinHeadsSlugs } from '../../config';
import conslog from '../../utils/dev';

// Middleware function to check status codes
function checkResponse(data) {
  return new Promise((resolve, reject) => {
    let resp;
    if ((data.status === 400) ||
        (data.status === 404) ||
        (data.status === 500)) {
      const error = new Error();
      error.message = 'Server Error. Please contact your server administrator.';
      error.status = 500;
      reject(error);
    }
    if (data.status === 401) {
      const error = new Error();
      error.message = 'Your session expired. Please login.';
      error.status = 401;
      reject(error);
    }
    if (data.status === 422) {
      if (data.error) {
        resp = {
          isError: true,
          message: data.error,
          status: 200
        };
      } else if (data.errors) {
        resp = {
          isError: true,
          message: data.errors,
          status: 200
        };
      } else {
        resp = {
          isError: true,
          message: 'The data entered is invalid. Please fix and try again.',
          status: 200
        };
      }
      resolve(resp);
    }
    if (data.status === 409) {
      if (data.error) {
        resp = {
          isError: true,
          message: data.error,
          status: 200
        };
      } else if (data.errors) {
        resp = {
          isError: true,
          message: data.errors,
          status: 200
        };
      } else {
        resp = {
          isError: true,
          message: 'The email address entered is already in use.',
          status: 200
        };
      }
      resolve(resp);
    }
    try {
      resp = data.json();
      resolve(resp);
    } catch (err) {
      const error = new Error();
      error.message = 'Server Error. Please contact your server administrator.';
      error.status = 500;
      reject(error);
    }
  });
}

// Error response
function setError(data) {
  const message = data.message || 'Server Error. Please contact your server administrator.';
  const resp = {
    isError: true,
    messages: [message],
    status: data.status || 500
  };
  return resp;
}

// Session params
function setUserSession(data, token, request) {
  request.session.token = token; // eslint-disable-line no-param-reassign
  request.session.loggedIn = data.loggedIn; // eslint-disable-line no-param-reassign
  request.session.username = data.userName; // eslint-disable-line no-param-reassign
  request.session.email = data.emailAddress; // eslint-disable-line no-param-reassign
  request.session.orderNumber = null; // eslint-disable-line no-param-reassign
  return true;
}

// Clear session params
function clearSession(request) {
  request.session = null; // eslint-disable-line no-param-reassign
  return true;
}

// Modify address response
function setAddressResponse(data) {
  let resp;
  if (data && data.id) {
    resp = {
      isLoaded: true,
      isEmpty: false,
      address: data
    };
  } else {
    resp = {
      isLoaded: true,
      isEmpty: true,
      address: {}
    };
  }
  return resp;
}

// Modidify login/register response
function setAuthResponse(data, request) {
  let resp;
  if (!data.isError && data.user) {
    const user = {
      userName: data.user.email.split('@')[0],
      emailAddress: data.user.email,
      loggedIn: true
    };
    const token = data.user.spree_api_key;
    setUserSession(user, token, request);
    resp = {
      isError: false,
      user,
      billing: setAddressResponse(data.bill_address),
      shipping: setAddressResponse(data.ship_address)
    };
  } else {
    let message = 'Server Error. Please contact your server administrator.';
    if (data.message && typeof data.message === 'object') {
      message = data.message.email || 'Server Error. Please contact your server administrator.';
    }
    if (data.message && typeof data.message === 'string') {
      message = data.message;
    }
    resp = {
      isError: true,
      messages: [message],
      status: data.status
    };
  }
  return resp;
}

// Set Logout response
function setLogoutResponse(request) {
  clearSession(request);
  const resp = {
    isError: false,
    user: {
      userName: '',
      emailAddress: '',
      loggedIn: false
    }
  };
  return resp;
}

// Set Login Check response
function setUserResponse(request) {
  return new Promise((resolve, reject) => {
    try {
      const { token, loggedIn } = request.session;
      let resp;
      if (token && loggedIn) {
        resp = {
          isError: false,
          user: {
            userName: request.session.username,
            emailAddress: request.session.email,
            loggedIn
          }
        };
      } else {
        resp = {
          isError: false,
          user: {
            loggedIn: false,
            username: '',
            email: ''
          }
        };
      }
      resolve(resp);
    } catch (err) {
      reject(err);
    }
  });
}

function setDefaultAddresses(addresses, billing, shipping) {
  const billingId = billing ? billing.id : 0;
  const shippingId = shipping ? shipping.id : 0;
  addresses.forEach((address) => {
    address.isBilling = address.id === billingId; // eslint-disable-line no-param-reassign
    address.isShipping = address.id === shippingId; // eslint-disable-line no-param-reassign
  });
  return addresses;
}

// Format User Addresses Response
function setAddressesResponse(data, newAddress) {
  let resp;
  if (!data.isError) {
    resp = {
      isError: false,
      billing: setAddressResponse(data.bill_address),
      shipping: setAddressResponse(data.ship_address),
      addresses: {
        isLoaded: true,
        isEmpty: data.owner_address.length === 0,
        addresses: setDefaultAddresses(data.owner_address, data.bill_address, data.ship_address)
      }
    };
    if (newAddress.isNew && newAddress.address) {
      resp.newAddress = newAddress.address;
    }
  } else {
    resp = {
      isError: true,
      messages: [data.message],
      billing: {
        isLoaded: true,
        isEmpty: true,
        address: {}
      },
      shipping: {
        isLoaded: true,
        isEmpty: true,
        address: {}
      },
      addresses: {
        isLoaded: true,
        isEmpty: true,
        addresses: []
      }
    };
  }
  return resp;
}

// Format edit/create address response
function setEditCreateAddressResponse(data) {
  let resp;
  conslog('ADRESA', data);
  if (!data.isError && !data.errors) {
    resp = {
      billing: setAddressResponse(data.default_addresses.bill_address),
      shipping: setAddressResponse(data.default_addresses.ship_address)
    };
  } else {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message]
    };
  }
  return resp;
}

function setCreateAddressResponse(data, request, callback) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message]
    };
    return resp;
  }
  return callback(request, { isNew: true, address: data.address });
}

// Format Order Response
function setOrderResponse(data) {
  let resp;
  if (!data.isError) {
    resp = {
      isError: false,
      isEmpty: (Object.getOwnPropertyNames(data).length < 1),
      order: data
    };
  } else {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      isEmpty: true,
      messages: [message],
      order: {}
    };
  }
  return resp;
}

// Format User Orders Response
function setOrdersResponse(data) {
  let resp;
  if (!data.isError) {
    resp = {
      isLoaded: true,
      isError: false,
      isEmpty: data.orders.length === 0,
      orders: data.orders
    };
  } else {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      isEmpty: true,
      messages: [message],
      orders: []
    };
  }
  return resp;
}

function setCartResponse(data, request, callback) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      isEmpty: true,
      messages: [message],
      status: data.status,
      cart: {}
    };
  } else if (Object.getOwnPropertyNames(data).length > 0) {
    const isEmpty = data.total_quantity < 1;
    resp = { isEmpty, cart: data };
    if (data.state === 'complete') {
      request.session.orderNumber = null; // eslint-disable-line no-param-reassign
    } else {
      request.session.orderNumber = data.number; // eslint-disable-line no-param-reassign
    }
  } else {
    return callback(request);
  }
  return resp;
}

function setAddRemoveCartResponse(data) {
  let resp;
  if (data.item.isError) {
    const message = data.item.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.item.status
    };
  } else {
    resp = {
      isError: false,
      name: data.item.name || data.item.variant.name,
      cart: data.cart
    };
  }
  return resp;
}

function setCouponResponse(data) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status
    };
  } else {
    resp = {
      isError: false,
      data
    };
  }
  return resp;
}

/* PRODUCTS */

/* Set Product Response */
function setProductResponse(data) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status
    };
  } else {
    resp = {
      isError: false,
      isEmpty: (Object.getOwnPropertyNames(data).length < 1),
      product: data
    };
  }
  return resp;
}

/* Set Products Response */
function setProductsResponse(data) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status
    };
  } else {
    resp = {
      isError: false,
      isEmpty: data.products.length === 0,
      products: data.products
    };
  }
  return resp;
}

/* Set Recommendations Response */
function setRecsResponse(data) {
  let resp;

  if (data.isError) {
    const message = data.item.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status,
      isLoaded: true,
      isEmpty: true,
      products: []
    };
  } else {
    resp = {
      isError: false,
      isLoaded: true,
      isEmpty: data.relations.length < 1,
      products: data.relations.slice(0, 3).map((rel) => (rel.product))
    };
  }
  return resp;
}

function setMannequinHeadsResponse(data) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status
    };
  } else {
    const products = data.products
      .filter((product) => (mannequinHeadsSlugs.includes(product.slug)));
    resp = {
      isError: false,
      isEmpty: products.length < 1,
      products
    };
  }
  return resp;
}

/* CONTACT */
function setContactResponse(data) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status
    };
  } else {
    resp = {
      isError: false,
      messages: ['Thank you. Your message has been submited.']
    };
  }
  return resp;
}

/* CHECKOUT */

function setBraintreeResponse(data) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      isEmpty: true,
      messages: [message],
      status: data.status
    };
  } else {
    resp = {
      isError: false,
      isEmpty: (Object.getOwnPropertyNames(data).length < 1),
      tokens: data
    };
  }
  return resp;
}

function setAddressCallBack(request, data, isPayPal, callback) {
  let resp;
  if (data.isError) {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      isEmpty: true,
      messages: [message],
      status: data.status
    };
    return resp;
  }
  if (isPayPal) {
    return setCartResponse(data, request, () => (true));
  }
  return callback(request);
}

/* Parse profile */
function parseProfile(data) {
  let resp = {};
  if (Object.getOwnPropertyNames(data).length > 0) {
    resp = { isLoaded: true, profile: data.users[0] };
    return resp;
  }
  resp = { isLoaded: true, profile: {} };
  return resp;
}

/* Parse profile on Update */
function parseProfileUpdate(data) {
  let resp = {};
  if (data) {
    resp = { isLoaded: true, profile: data };
    return resp;
  }
  resp = { isLoaded: true, profile: {} };
  return resp;
}

/* Parse password Update */
function parsePasswordUpdate(data) {
  let resp = {};
  if (data.passwords && (data.passwords.password === data.passwords.password_confirmation)) {
    return resp;
  }
  resp = {};
  return resp;
}

/* Delete Address */
function setDeleteAddressResponse(data) {
  let resp = {};
  if (data) {
    return resp;
  }
  resp = {};
  return resp;
}

export {
  checkResponse,
  setError,
  setAuthResponse,
  setLogoutResponse,
  setUserResponse,
  setAddressResponse,
  setAddressesResponse,
  setCreateAddressResponse,
  setEditCreateAddressResponse,
  setOrderResponse,
  setOrdersResponse,
  setCartResponse,
  setAddRemoveCartResponse,
  setCouponResponse,
  setProductResponse,
  setProductsResponse,
  setRecsResponse,
  setMannequinHeadsResponse,
  setContactResponse,
  setBraintreeResponse,
  setAddressCallBack,
  parseProfile,
  parseProfileUpdate,
  parsePasswordUpdate,
  setDeleteAddressResponse
};
