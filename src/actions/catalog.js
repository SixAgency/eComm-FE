import axios from 'axios';

function getProducts() {
  return (dispatch) => {
    axios.get('/api/products')
      .then((resp) => {
        console.log(resp.data);
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: resp.data.products });
      })
      .catch(err => dispatch({ type: 'GET_PRODUCTS_ERROR', payload: err }));
  };
}

function getProductRecs() {
  return (dispatch) => {
    axios.get('/api/products')
      .then(resp => dispatch({ type: 'GET_RECS_SUCCESS', payload: resp.data.products.slice(0, 3) }))
      .catch(err => dispatch({ type: 'GET_RECS_ERROR', payload: err }));
  };
}

function getProduct(slug) {
  return (dispatch) => {
    axios.get(`/api/product/${slug}`)
      .then(resp => dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: resp.data }))
      .catch(err => dispatch({ type: 'GET_PRODUCT_ERROR', payload: err }));
  };
}

export { getProducts, getProduct, getProductRecs };
