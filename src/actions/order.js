import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';

function resetCart() {
  const data = {
    isEmpty: true,
    isLoaded: true,
    cart: {},
  };
  return { type: 'RESET_CART', payload: data };
}

function setCart(cart) {
  const data = cart;
  data.isLoaded = true;
  return { type: 'SET_CART', payload: data };
}

function setCode() {
  const data = {
    message: 'Code has been applied',
    isLoaded: true,
  };
  return { type: 'APPLY_PROMO_CODE_SUCCESS', payload: data };
}

function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        dispatch(resetCart());
      });
  };
}

function addToCart(data) {
  return (dispatch) => {
    axios.post('/api/cart', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data.cart));
        const message = `${response.data.name} has been added to your cart.`;
        dispatch(setMessage({ isError: false, messages: [message] }));
        forwardTo('cart');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        forwardTo('cart');
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

function removeItem(data) {
  return (dispatch) => {
    axios.post('/api/cart/remove', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data.cart));
        const message = `${response.data.name} has been removed from your cart.`;
        dispatch(setMessage({ isError: false, messages: [message] }));
        forwardTo('cart');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        forwardTo('cart');
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
        // dispatch(resetCart());
      });
  };
}

function updateCart(data) {
  return (dispatch) => {
    axios.put('/api/cart', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        const message = 'Cart updated.';
        dispatch(setMessage({ isError: false, messages: [message] }));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
        // dispatch(resetCart());
      });
  };
}

function updateQuantity(data) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_QTY_SUCCES', payload: data });
  };
}

function applyPromoCode(data) {
  return (dispatch) => {
    axios.put('api/applycode', { data })
      .then(() => {
        dispatch(setCode());
        const message = 'Code has been applied.';
        dispatch(setMessage({ isError: false, messages: [message] }));
      }, () => {
        dispatch(setMessage({ isError: true, messages: ['Something went wrong'] }));
      })
      .catch((err) => {
        console.log('Error', err); // esling-disable-line no-console
        forwardTo('error');
      });
  };
}

export { getCart, addToCart, removeItem, updateCart, updateQuantity, resetCart, applyPromoCode };
