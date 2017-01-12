import axios from 'axios';

function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
      .then(resp => dispatch({ type: 'GET_CART_SUCCESS', payload: resp.data }))
      .catch(err => dispatch({ type: 'GET_CART_ERROR', payload: err }));
  };
}

function addToCart(data) {
  return (dispatch) => {
    axios.post('/api/addtocart', data)
      .then(resp => {
        axios.get('/api/cart')
          .then(cart => dispatch({ type: 'GET_CART_SUCCESS', payload: cart.data }))
          .catch(err => dispatch({ type: 'GET_CART_ERROR', payload: err }));
        const response = {
          message: `“${resp.data.variant.name}” has been added to your cart.`,
          cart: resp.data,
        };
        dispatch({ type: 'ADD_CART_SUCCESS', payload: response });
      })
      .catch(err => dispatch({ type: 'ADD_CART_ERROR', payload: err }));
  };
}

export { getCart, addToCart };
