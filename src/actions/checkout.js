import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setCart, resetCart, getCart } from './order';
import { setMessage, resetMessages, setLoader, setPending } from './page';
import { getCheckoutAddresses } from '../helpers/feed';

function setPayPal(data) {
  return { type: 'SET_PAYPAL', payload: { ...data, isLoaded: true } };
}

/**
 * Set Cart State
 * @param cart
 * @returns {{type: string, payload: *}}
 */
function setCartState(state) {
  return { type: 'SET_CART_STATE', payload: state };
}

function setPayment(isPayPal) {
  return { type: 'SET_PAYMENT', payload: isPayPal };
}

function setBilling(id) {
  const address = {
    isLoaded: true,
    isSet: id !== null,
    address: id
  };
  return { type: 'SET_CHECKOUT_BILLING', payload: address };
}

function setShipping(id) {
  const address = {
    isLoaded: true,
    isSet: id !== null,
    address: id
  };
  return { type: 'SET_CHECKOUT_SHIPPING', payload: { ...address, isLoaded: true } };
}

function getPayPalToken() {
  window.scrollTo(0, 0);
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
  window.scrollTo(0, 0);
  return (dispatch) => {
    axios.post('/api/checkout/paypal', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        dispatch(setPayment(true));
        forwardTo('checkout');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

function checkoutAddresses(data) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    const addresses = getCheckoutAddresses(data);
    if (addresses.isError) {
      dispatch(setMessage({ isError: true, messages: addresses.messages }));
    } else {
      axios.post('/api/checkout/address', addresses)
        .then((response) => checkResponse(response.data, () => {
          dispatch(setCart(response.data));
          forwardTo('checkout/promo');
          dispatch(setPending(false));
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    }
  };
}

function checkoutNext(state) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(resetMessages());
    if (state !== 'cart') {
      forwardTo('checkout');
    } else {
      axios.post('/api/checkout/next')
        .then((response) => checkResponse(response.data, () => {
          if (response.data.cart.state === 'complete') {
            dispatch(setMessage({ isError: true, messages: ['Your order placed successfully.'] }));
          } else {
            dispatch(setCart(response.data));
            forwardTo('checkout/billing');
          }
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    }
  };
}

function completePayPal() {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/next')
      .then((response) => checkResponse(response.data, () => {
        const orderLink = `my-account/view-order/${response.data.cart.id}`;
        forwardTo(orderLink);
        dispatch(resetCart());
        dispatch(setMessage({ isError: true, messages: ['Your purchase completed successfully.'] }));
        dispatch(getCart());
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

export {
  getPayPalToken,
  checkoutPayPal,
  checkoutAddresses,
  checkoutNext,
  setCartState,
  setBilling,
  setShipping,
  completePayPal,
  setPayment,
};
