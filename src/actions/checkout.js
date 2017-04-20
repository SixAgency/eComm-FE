import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setCart, setOrder, getCart } from './order';
import { setMessage, resetMessages, setLoader, setPending } from './page';
import { setCheckoutAddressFeed, setCheckoutAddressesFeed } from '../helpers/feed';
import { validateMandatoryFieldsAddress } from '../helpers/validators';

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

/**
 * Set isPayPal flag
 * @param cart
 * @returns {{type: string, payload: *}}
 */
function setPayment(isPayPal) {
  return { type: 'SET_PAYMENT', payload: isPayPal };
}

/**
 * Set Checkout Billing State
 * @param cart
 * @returns {{type: string, payload: *}}
 */
function setBilling(id) {
  const address = {
    isLoaded: true,
    isSet: id !== null,
    addressId: id
  };
  return { type: 'SET_CHECKOUT_BILLING', payload: address };
}

/**
 * Set Checkout Shipping State
 * @param cart
 * @returns {{type: string, payload: *}}
 */
function setShipping(id) {
  const address = {
    isLoaded: true,
    isSet: id !== null,
    addressId: id
  };
  return { type: 'SET_CHECKOUT_SHIPPING', payload: address };
}

/**
 * Get braintree token to initialize PayPal
 */
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

/**
 * Set paypal as payment source
 * @param data
 * @returns {function(*=)}
 */
function checkoutPayPal(data) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    axios.post('/api/checkout/paypal', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        dispatch(setPayment(true));
        forwardTo('checkout/review');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/**
 * Next step - we are using for ort state transition
 * @returns {function(*=)}
 */
function checkoutNext(callback) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/next')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        dispatch(setPending(false));
        if (callback) {
          callback();
        }
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/**
 * The same as above - just with paypal - we are using to finalize an order
 * @param state
 * @returns {function(*=)}
 */
function completePayPal() {
  return (dispatch) => {
    window.scrollTo(0, 0);
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/next')
      .then((response) => checkResponse(response.data, () => {
        const order = {
          isEmpty: response.data.isEmpty,
          order: response.data.cart
        };
        dispatch(setOrder(order));
        const orderLink = `my-account/view-order/${response.data.cart.number}`;
        dispatch(setMessage({ isError: false, messages: ['Your purchase completed successfully.'] }));
        forwardTo(orderLink);
        dispatch(getCart(true));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        dispatch(setPending(false));
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/* *** New Stuff *** */
function setCheckoutAddress(data) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(data.address);
    const validEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/.test(data.email);
    if (!validEmail) {
      valid.isError = true;
      valid.messages.push('Please enter a valid email address.');
    }
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch(setLoader(true));
      dispatch(setPending(true));
      axios.post('/api/checkout/addresses', setCheckoutAddressesFeed(data))
        .then((response) => checkResponse(response.data, () => {
          dispatch(setCart(response.data));
          forwardTo('checkout/shipping');
          dispatch(setPending(false));
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch(setPending(false));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    }
  };
}

function editOrderAddress(data, callback) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(data.address);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch(setLoader(true));
      dispatch(setPending(true));
      axios.post('/api/checkout/address', setCheckoutAddressFeed(data))
        .then((response) => checkResponse(response.data, () => {
          // dispatch(setCart(response.data));
          /* Callback after edit success */
          callback();
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch(setPending(false));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    }
  };
}

export {
  getPayPalToken,
  checkoutPayPal,
  checkoutNext,
  setCartState,
  setBilling,
  setShipping,
  completePayPal,
  setPayment,
  setCheckoutAddress,
  editOrderAddress
};
