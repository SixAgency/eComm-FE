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
  // const resp = {};
  const session = req.session;
  if (Object.getOwnPropertyNames(data).length > 0) {
    session.orderNumber = data.number;
    return { ...data, isLoaded: true, isEmpty: false };
  }
  // callback(req).then((resp) => {
  //   session.orderNumber = resp.number;
  //   return { ...data, isLoaded: true, isEmpty: true };
  // });
  return { ...data, isLoaded: true, isEmpty: true };
}

export { parseResponse, parseError, parseCart };
