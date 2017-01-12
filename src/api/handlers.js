import conslog from '../utils/dev';

function parseResponse(data) {
  let resp = {};
  if ((data.status === 404) || (data.status === 500)) {
    resp = { error: 'Server Error. Please try again.' };
    return Promise.reject(resp);
  }
  resp = data.json();
  return Promise.resolve(resp);
}

function parseError(error) {
  const resp = { data: { error }, status: 500 };
  return resp;
}

function parseCart(data, req) {
  let resp = {};
  const session = req.session;
  if (Object.getOwnPropertyNames(data).length > 0) {
    const isEmpty = data.total_quantity < 1;
    session.orderNumber = data.number;
    resp = { isLoaded: true, isEmpty, cart: data };
    return resp;
  }
  resp = { isLoaded: false, isEmpty: true, cart: {} };
  conslog(resp);
  return resp;
}

function handleLogout(data, request) {
  const resp = { error: false, status: 200 };
  // eslint-disable-next-line no-param-reassign
  request.session = null;
  return resp;
}

function handleAuth(data, request) {
  let resp = {};
  if (data.user) {
    const user = data.user.email.split('@')[0];
    resp = {
      error: false,
      userName: user,
      emailAddress: data.user.email,
      loggedIn: true,
      status: 200,
    };
    request.session.token = data.user.spree_api_key; // eslint-disable-line no-param-reassign
    request.session.userName = user; // eslint-disable-line no-param-reassign
    request.session.emailAddress = data.user.email; // eslint-disable-line no-param-reassign
    request.session.loggedIn = true; // eslint-disable-line no-param-reassign
  } else {
    resp = {
      error: true,
      message: data.error,
      status: 200,
    };
  }
  return resp;
}

export { parseResponse, parseError, parseCart, handleAuth, handleLogout };
