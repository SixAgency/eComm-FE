import axios from 'axios';
import { browserHistory } from 'react-router'

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
        const response = { message: `“${resp.data.variant.name}” has been added to your cart.` };
        dispatch({ type: 'ADD_CART_SUCCESS', payload: response });
        browserHistory.push('/cart');
      })
      .catch(err => {
        dispatch({ type: 'ADD_CART_ERROR', payload: err });
        browserHistory.push('/cart');
      });
  };
}

function removeItem(data) {
  return (dispatch) => {
    axios.post('/api/removefromcart', { id: data.id })
      .then(resp => {
        axios.get('/api/cart')
          .then(cart => dispatch({ type: 'GET_CART_SUCCESS', payload: cart.data }))
          .catch(err => dispatch({ type: 'GET_CART_ERROR', payload: err }));
        const response = { message: `“${data.name}” has been removed from your cart.` };
        dispatch({ type: 'REMOVE_CART_SUCCESS', payload: response });
        browserHistory.push('/cart');
      })
      .catch(err => {
        dispatch({ type: 'REMOVE_CART_ERROR', payload: err });
        browserHistory.push('/cart');
      });
  };
}


export { getCart, addToCart, removeItem };
