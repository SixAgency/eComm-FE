import { apiFetch } from '../core/fetch';
import { parseResponse, parseError } from './handlers';
import { faketoken } from '../config';

const PRODUCT = '/api/products';

// Get Products
function getProducts(request) {
  const response = apiFetch(`${PRODUCT}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((data) => parseResponse(data))
  .then((data) => (data))
  .catch((err) => parseError(err));
  return response;
}

// Get Product
function getProduct(request) {
  // @TODO - validate slug presence
  const slug = request.params.slug;
  const response = apiFetch(`${PRODUCT}/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((data) => parseResponse(data))
    .then((data) => (data))
    .catch((err) => parseError(err));
  return response;
}

export { getProducts, getProduct };
