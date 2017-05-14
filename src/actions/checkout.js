import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setCart, getCart } from './order';
import { setMessage, resetMessages, setLoader, setPending } from './page';
import { setUser } from './user';
import { setCheckoutAddressFeed, setCheckoutAddressesFeed } from '../helpers/feed';
import { validateRegisterCheckout, validateMandatoryFieldsAddress } from '../helpers/validators';

function setPayPal(data) {
  return { type: 'SET_PAYPAL', payload: { ...data, isLoaded: true } };
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
        dispatch(setPayPal({ isLoaded: true, isEmpty: true, tokens: {} }));
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
    dispatch(setLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/paypal', { data })
      .then((response) => checkResponse(response.data, () => {
        forwardTo('checkout/review');
        dispatch(setCart(response.data));
        dispatch(setPending(false));
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
        if (callback) {
          callback();
        }
        dispatch(setPending(false));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/* *** New Stuff *** */
function setCheckoutAddress(data) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(data.billing);
    const validEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/.test(data.email);
    if (!validEmail) {
      valid.isError = true;
      valid.messages.push('Please enter a valid email address.');
    }
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch(setPending(true));
      dispatch(setLoader(true));
      axios.post('/api/checkout/addresses', setCheckoutAddressesFeed(data))
        .then((response) => checkResponse(response.data, () => {
          dispatch(setCart(response.data));
          forwardTo('checkout/billing');
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

function registerAndSetAddress(data) {
  return (dispatch) => {
    const valid = validateRegisterCheckout(data.checkoutAddressFields);
    let registerError = false;
    if (valid.isError) {
      window.scrollTo(0, 0);
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch(setPending(true));
      axios.post('/api/register', data.registrationFields)
        .then((response) => checkResponse(response.data, () => {
          // Set the user
          dispatch(setUser(response.data.user));
          return response;
        }, () => {
          registerError = true;
          window.scrollTo(0, 0);
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch(setPending(false));
        }))
        .then(() => {
          if (!registerError) {
            dispatch(getCart(false, () => {
              dispatch(setCheckoutAddress(data.checkoutAddressFields));
            }));
          }
        })
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
        });
    }
  };
}

export {
  getPayPalToken,
  checkoutPayPal,
  checkoutNext,
  setCheckoutAddress,
  editOrderAddress,
  registerAndSetAddress
};
