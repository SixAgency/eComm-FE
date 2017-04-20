import { apiFetch } from './fetch';
// Helpers
import {
  checkResponse,
  setError,
  setProductResponse,
  setProductsResponse,
  setRecsResponse,
  setMannequinHeadsResponse
} from './helpers/handlers';

const PRODUCT = '/api/v1/products';
const CATEGORY = '/api/v1/taxons/products';

// Get Products
function getProducts(request) {
  let status;
  return apiFetch(`${PRODUCT}`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setProductsResponse(data))
    .catch((err) => setError(err));
}

// Get Product Recs
// @TODO - update when we have an endpoint
function getProductRecs(request, product) {
  let status;
  return apiFetch(`${PRODUCT}/${product.id}/relations`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setRecsResponse(data, product))
    .catch((err) => setError(err));
}

// Add product recs to the product feed
function setProductRecs(data, request, callback) {
  let response;
  return getProductRecs(request, data)
    .then((recs) => {
      response = {
        ...data,
        recs
      };
      return callback(response);
    })
    .catch((err) => {
      response = {
        ...data,
        recs: {
          isError: true,
          messages: err,
          isLoaded: true,
          isEmpty: true,
          products: [],
        },
      };
      return callback(response);
    });
}

// Get Product
function getProduct(request) {
  let status;
  const slug = request.params.slug;
  return apiFetch(`${PRODUCT}/${slug}`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setProductRecs(data, request, setProductResponse))
    .catch((err) => setError(err));
}

// Get Mannequin heads
function getMannequinHeads(request) {
  let status;
  return apiFetch(`${PRODUCT}`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setMannequinHeadsResponse(data))
    .catch((err) => setError(err));
}

// Get Products in category
function getProductsInCategory(request) {
  let status;
  const slug = request.params.slug;
  return apiFetch(`${CATEGORY}?permalink=categories/${slug}`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setProductsResponse(data))
    .catch((err) => setError(err));
}

export { getProducts, getProduct, getMannequinHeads, getProductsInCategory };
