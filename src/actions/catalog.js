import axios from 'axios';

function getProducts() {
  return (dispatch) => {
    axios.get('/api/products')
      .then(resp => dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: resp.data.products }))
      .catch(err => dispatch({ type: 'GET_PRODUCTS_ERROR', payload: err }));
  };
}

export default getProducts;
