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

export { parseResponse, parseError, parseCart };
