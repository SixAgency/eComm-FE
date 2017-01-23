import axios from 'axios';
import { browserHistory } from 'react-router';

function resetCart() {
  const data = {
    isEmpty: true,
    isLoaded: false,
    cart: {},
  };
  return { type: 'RESET_CART', payload: data };
}

function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
      .then((resp) => dispatch({ type: 'GET_CART_SUCCESS', payload: resp.data }))
      .catch((err) => dispatch({ type: 'GET_CART_ERROR', payload: err }));
  };
}

function addToCart(data) {
  return (dispatch) => {
    axios.post('/api/addtocart', data)
      .then((resp) => {
        const response = { message: `“${resp.data.name}” has been added to your cart.` };
        dispatch({ type: 'ADD_CART_SUCCESS', payload: response });
        dispatch({ type: 'GET_CART_SUCCESS', payload: resp.data.cart });
        browserHistory.push('/cart');
      })
      .catch((err) => {
        dispatch({ type: 'ADD_CART_ERROR', payload: err });
        browserHistory.push('/cart');
      });
  };
}

function removeItem(data) {
  return (dispatch) => {
    axios.post('/api/removefromcart', { id: data.id })
      .then(() => {
        axios.get('/api/cart')
          .then((cart) => {
            dispatch({ type: 'GET_CART_SUCCESS', payload: cart.data });
            const response = { message: `“${data.name}” has been removed from your cart.` };
            dispatch({ type: 'REMOVE_CART_SUCCESS', payload: response });
            browserHistory.push('/cart');
          })
          .catch((err) => dispatch({ type: 'GET_CART_ERROR', payload: err }));
      })
      .catch((err) => {
        dispatch({ type: 'REMOVE_CART_ERROR', payload: err });
        browserHistory.push('/cart');
      });
  };
}

function updateCart(data) {
  return (dispatch) => {
    axios.put('/api/cart', { data })
      .then((resp) => {
        dispatch({ type: 'UPDATE_CART_SUCCESS', payload: { message: 'Cart updated.', cart: resp.data } });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_CART_ERROR', payload: err });
      });
  };
}

function updateQuantity(data) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_QTY_SUCCES', payload: data });
  };
}

export { getCart, addToCart, removeItem, updateCart, updateQuantity, resetCart };
