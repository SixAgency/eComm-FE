import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';

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

export { getProducts, getProduct, getMannequinHeads, getProductsInCategory };
