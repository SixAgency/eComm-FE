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

function parseCart(data) {
  // const resp = {};
  if (Object.getOwnPropertyNames(data).length > 0) {
    return { ...data, isLoaded: true, isEmpty: false };
  }
  return { ...data, isLoaded: true, isEmpty: true };
}

export { parseResponse, parseError, parseCart };
