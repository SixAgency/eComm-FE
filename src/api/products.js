import { apiFetch } from '../core/fetch';
import { parseResponse, parseError } from './handlers';
import { faketoken } from '../config';

import conslog from '../utils/dev';

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

// Get Product Recs
// @TODO - update when we have an endpoint
function getProductRecs(request) {
  return apiFetch(`${PRODUCT}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((data) => parseResponse(data))
    .then((data) => {
      let response;
      if (data.isError) {
        response = {
          isLoaded: true,
          isEmpty: true,
          products: [],
        };
      } else {
        const empty = data.products.length < 1;
        response = {
          isLoaded: true,
          isEmpty: empty,
          products: data.products.slice(0, 3),
        };
      }
      return response;
    })
    .catch((err) => parseError(err));
}

// Get Product
function getProduct(request) {
  // @TODO - validate slug presence
  const slug = request.params.slug;
  return apiFetch(`${PRODUCT}/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
    .then((data) => parseResponse(data))
    .then((data) => (
      getProductRecs(request)
        .then((recs) => {
          const response = { ...data, recs };
          return response;
        }).catch((err) => {
          conslog('ERROR', err);
          const gridRecs = {
            isLoaded: true,
            isEmpty: true,
            products: {},
          };
          const response = { ...data, gridRecs };
          conslog('ERROR', response);
          return response;
        })
    ))
    .catch((err) => parseError(err));
}

// Get Products based on slug

export { getProducts, getProduct };
