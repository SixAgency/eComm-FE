import { apiFetch } from '../core/fetch';

const PRODUCT = '/api/products';
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';

// Helpers - TODO - MOVE TO utils.js or helpers.js
function handleError(error, response) {
  const resp = { data: { error }, status: 500 };
  response.json(resp);
}

function handleResponse(data, response) {
  response.json(data);
}

function parseResponse(data) {
  let resp = {};
  if ((data.status === 404) || (data.status === 500)) {
    resp = { error: 'Server Error. Please try again.' };
    return Promise.reject(resp);
  }
  resp = data.json();
  return Promise.resolve(resp);
}

// Get Product
function getProducts(request, response) {
  const slug = request.params.slug || '';
  apiFetch(`${PRODUCT}/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || token,
      },
    })
  .then((data) => parseResponse(data))
  .then((data) => handleResponse(data, response))
  .catch((err) => handleError(err, response));
}

export default getProducts;
