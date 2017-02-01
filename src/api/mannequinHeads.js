import { apiFetch } from '../core/fetch';
import { parseError, parseResponse } from './handlers';
import { faketoken, mannequinHeadsSlugs } from '../config';

const PRODUCT = '/api/products';

function getMannequinHeads(request) {
  const response = apiFetch(`${PRODUCT}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || faketoken,
    },
  })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp.products.filter((product) => (mannequinHeadsSlugs.includes(product.slug)))))
  .catch((err) => parseError(err));
  return response;
}

export default getMannequinHeads;
