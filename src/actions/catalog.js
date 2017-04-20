import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage, resetMessages, setLoader } from './page';
import { validateReview } from '../helpers/validators';

/**
 * Update products from Redux state
 * @param products
 * @returns {{type: string, payload: {isLoaded: boolean, products: *}}}
 */
function setProducts(products) {
  const data = {
    isLoaded: true,
    ...products
  };
  return { type: 'SET_PRODUCTS', payload: data };
}

/**
 * Update the product from Redux state
 * @param product
 * @returns {{type: string, payload: {isLoaded: boolean, product: *}}}
 */
function setProduct(product) {
  const data = {
    isLoaded: true,
    ...product
  };
  return { type: 'SET_PRODUCT', payload: data };
}

/**
 * Update mannequin heads from Redux state
 * @param products
 * @returns {{type: string, payload: {isLoaded: boolean}}}
 */
function setMannequin(products) {
  const data = {
    isLoaded: true,
    ...products
  };
  return { type: 'SET_MANNEQUIN', payload: data };
}

function setCategoryItems(products, slug) {
  const data = {
    isLoaded: true,
    ...products,
    slug
  };
  return { type: 'SET_CATEGORY', payload: data };
}

/**
 * Get Products
 * @returns {function(*=)}
 */
function getProducts() {
  return (dispatch) => {
    axios.get('/api/products')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setProducts(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

/**
 * Get product
 * @param slug
 * @returns {function(*=)}
 */
function getProduct(slug) {
  return (dispatch) => {
    axios.get(`/api/product/${slug}`)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setProduct(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

/**
 * Add Product Review
 * @param id, data
 * @returns {function(*=)}
 */
function addProductReview(id, data, callback) {
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(resetMessages());
    const valid = validateReview(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
      dispatch(setLoader(false));
    } else {
      axios.post(`/api/products/${id}/reviews`, data)
        .then((response) => checkResponse(response.data, () => {
          // dispatch(setProduct(response.data));
          dispatch(setMessage({ isError: false, messages: ['Your review has been submited and is pending approval'] }));
          dispatch(setLoader(false));
          callback();
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch(setLoader(false));
          callback();
        }))
        .catch((err) => {
          console.error('Error', err); // eslint-disable-line no-console
          forwardTo('error');
        });
    }
  };
}

/**
 * Get Mannequin heads
 * @returns {function(*=)}
 */
function getMannequinHeads() {
  return (dispatch) => {
    axios.get('/api/mannequin')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setMannequin(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

/**
 * Get Products per category
 * @returns {function(*=)}
 */
function getProductsInCategory(slug) {
  return (dispatch) => {
    axios.get(`/api/category/${slug}`)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCategoryItems(response.data, slug));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

export { getProducts, getProduct, getMannequinHeads, getProductsInCategory, addProductReview };
