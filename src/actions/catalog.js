import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';

function setProducts(products) {
  const data = {
    isLoaded: true,
    products,
  };
  return { type: 'GET_PRODUCTS_SUCCESS', payload: data.products };
}

function getProducts() {
  return (dispatch) => {
    axios.get('/api/products')
      .then((resp) => {
        // dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: resp.data.products });
        dispatch(setProducts(resp.data.products));
      }, () => {
        dispatch(setMessage({ isError: true, messages: ['Something went wrong'] }));
      })
      .catch((err) => {
        console.log('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

function getProductRecs() {
  return (dispatch) => {
    axios.get('/api/products')
      .then((resp) => {
        dispatch({ type: 'GET_RECS_SUCCESS', payload: resp.data.products.slice(0, 3) });
      }, () => {
        dispatch(setMessage({ isError: true, messages: ['Something went wrong'] }));
      })
      .catch((err) => {
        console.log('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

function getProduct(slug) {
  return (dispatch) => {
    axios.get(`/api/product/${slug}`)
      .then((resp) => dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: resp.data }))
      .catch((err) => dispatch({ type: 'GET_PRODUCT_ERROR', payload: err }));
  };
}

export { getProducts, getProduct, getProductRecs };
