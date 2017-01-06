import { apiFetch } from '../core/fetch';
import { parseResponse, parseError } from './handlers';

const PRODUCT = '/api/products';
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';

// Get Products
function getProducts(request) {
  const slug = request.params.slug || '';
  const response = apiFetch(`${PRODUCT}/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || token,
      },
    })
  .then((data) => parseResponse(data))
  .then((data) => (data))
  .catch((err) => parseError(err));
  return response;
}

export default getProducts;
