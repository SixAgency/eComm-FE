import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';

/**
 * Update products from Redux store
 * @param products
 * @returns {{type: string, payload: {isLoaded: boolean, products: *}}}
 */
function setProducts(products) {
  const data = {
    isLoaded: true,
    products,
  };
  return { type: 'SET_PRODUCTS', payload: data };
}

/**
 * Update the product from Redux store
 * @param product
 * @returns {{type: string, payload: {isLoaded: boolean, product: *}}}
 */
function setProduct(product) {
  const data = {
    isLoaded: true,
    product,
  };
  return { type: 'SET_PRODUCT', payload: data };
}

/**
 * Get Products
 * @returns {function(*=)}
 */
function getProducts() {
  return (dispatch) => {
    axios.get('/api/products')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setProducts(response.data.products));
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

export { getProducts, getProduct };
