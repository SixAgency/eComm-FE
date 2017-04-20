import { apiFetch } from './fetch';
// Helpers
import {
  checkResponse,
  setError,
  setProductResponse,
  setProductsResponse,
  setRecsResponse,
  setReviewsResponse,
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
      return response;
    })
    .catch((err) => {
      response = {
        ...data,
        recs: {
          isError: true,
          messages: err,
          isLoaded: true,
          isEmpty: true,
          products: []
        }
      };
      return response;
    });
}

function getProductReviews(request, product) {
  let status;
  return apiFetch(`${PRODUCT}/${product.id}/reviews`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setReviewsResponse(data, product))
    .catch((err) => setError(err));
}

function setProductReviews(data, request, callback) {
  let response;
  return getProductReviews(request, data)
    .then((reviews) => {
      response = {
        ...data,
        reviews
      };
      return callback(response);
    })
    .catch((err) => {
      response = {
        ...data,
        reviews: {
          isError: true,
          messages: err,
          isLoaded: true,
          isEmpty: true,
          reviews: []
        }
      };
      return callback(response);
    });
}

// Get Product
function getProduct(request) {
  let status;
  const slug = request.params.slug ? request.params.slug : request.params.id;
  return apiFetch(`${PRODUCT}/${slug}`, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setProductRecs(data, request))
    .then((data) => setProductReviews(data, request, setProductResponse))
    .catch((err) => setError(err));
}

// Add Product review
function addProductReview(request) {
  const review = {
    review: {
      rating: 5,
      review: request.body.review,
      name: request.body.name,
      show_identifier: 1,
      email: request.body.email
    }
  };
  const productID = request.params.id;
  const endpoint = `${PRODUCT}/${productID}/reviews`;
  return apiFetch(endpoint,
    {
      method: 'POST',
      body: JSON.stringify(review)
    }, request.session)
  .then((response) => checkResponse(response))
  // .then(() => getProduct(request))
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

export { getProducts, getProduct, getMannequinHeads, getProductsInCategory, addProductReview };
