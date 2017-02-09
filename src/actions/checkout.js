import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setCart } from './order';
import { setMessage } from './page';

function setPayPal(data) {
  return { type: 'SET_PAYPAL', payload: { ...data, isLoaded: true } }
};

function getPayPalToken() {
  return (dispatch) => {
    axios.get('/api/checkout/braintree')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setPayPal(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        dispatch(setPayPal({ isLoaded: true, isEmpty: true, tokens: {}}));
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

function checkoutPayPal(data) {
  return (dispatch) => {
    axios.post('/api/checkout/paypal', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        forwardTo('checkout');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

function checkoutAddresses() {
  return (dispatch) => {
    axios.post('/api/checkout/paypal')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setPayPal(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

function checkoutNext(state) {
  if (state === 'cart') {
    return (dispatch) => {
      axios.post('/api/checkout/next')
        .then((response) => checkResponse(response.data, () => {
          dispatch(setCart(response.data));
          forwardTo('checkout');
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    };
  }
  return forwardTo('checkout');
}

export { getPayPalToken, checkoutPayPal, checkoutAddresses, checkoutNext };
