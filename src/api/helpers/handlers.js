import Promise from 'bluebird';

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
          status: 200,
        };
      } else {
        resp = {
          isError: true,
          message: 'The data entered is invalid. Please fix and try again.',
          status: 200,
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
  const message = data.error || 'Server Error. Please contact your server administrator.';
  const resp = {
    isError: true,
    messages: [message],
    status: data.status || 500,
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
      isEmpty: false,
      address: data,
    };
  } else {
    resp = {
      isEmpty: true,
      address: {},
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
      loggedIn: true,
    };
    const token = data.user.spree_api_key;
    setUserSession(user, token, request);
    resp = {
      isError: false,
      user,
      billing: setAddressResponse(data.bill_address),
      shipping: setAddressResponse(data.ship_address),
    };
  } else {
    const message = data.error || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
      status: data.status,
    };
  }
  return resp;
}

function setLogoutResponse(request) {
  clearSession(request);
  const resp = {
    isError: false,
    user: {
      userName: '',
      emailAddress: '',
      loggedIn: false,
    },
  };
  return resp;
}

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
            loggedIn,
          },
        };
      } else {
        resp = {
          isError: false,
          user: {
            loggedIn: false,
            username: '',
            email: '',
          },
        };
      }
      resolve(resp);
    } catch (err) {
      reject(err);
    }
  });
}

function setAddressesResponse(data) {
  let resp;
  if (!data.isError) {
    resp = {
      billing: setAddressResponse(data.bill_address),
      shipping: setAddressResponse(data.ship_address),
    };
  } else {
    resp = {
      isError: true,
      messages: [data.message],
      billing: {
        isEmpty: true,
        address: {},
      },
      shipping: {
        isEmpty: true,
        address: {},
      },
    };
  }
  return resp;
}

function setEditCreateAddressResponse(data, type) {
  let resp;
  if (!data.isError && !data.errors) {
    if (type === 'bill_address') {
      resp = {
        billing: setAddressResponse(data.address),
      };
    } else {
      resp = {
        shipping: setAddressResponse(data.address),
      };
    }
  } else {
    const message = data.message || 'Server Error. Please contact your server administrator.';
    resp = {
      isError: true,
      messages: [message],
    };
  }
  return resp;
}

export {
  checkResponse,
  setError,
  setAuthResponse,
  setLogoutResponse,
  setUserResponse,
  setAddressesResponse,
  setEditCreateAddressResponse,
};
