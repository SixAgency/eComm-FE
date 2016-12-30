import { apiFetch } from '../core/fetch';

const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';

function handleError(error, response) {
  const resp = { data: { error }, status: 500 };
  response.json(resp);
}

function parseResponse(response) {
  let resp = {};
  if ((response.status === 404) || (response.status === 500)) {
    resp = { error: 'Server Error. Please try again.' };
    return Promise.reject(resp);
  }
  resp = response.json();
  return Promise.resolve(resp);
}

function handleResponse(data, response) {
  response.json(data);
}

// Get Order Details
function getOrderDetails(request, response) {
  const ORDERS = `/api/orders/${request.query.id}?token=${token}`;
  apiFetch(ORDERS, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || token,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => handleResponse(data, response))
  .catch((err) => handleError(err, response));
}

// TODO - user orders
export default getOrderDetails;
