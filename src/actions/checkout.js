import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setCart, resetCart, getCart } from './order';
import { setMessage, resetMessages, setLoader } from './page';
import { validateMandatoryFieldsAddress } from '../helpers/validators';

function setPayPal(data) {
  return { type: 'SET_PAYPAL', payload: { ...data, isLoaded: true } }
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

function setBilling(address) {
  console.log('address', address);
  return { type: 'SET_CHECKOUT_BILLING', payload: { ...address, isLoaded: true } };
}

function setShipping(address) {
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
    dispatch(resetMessages());
    axios.post('/api/checkout/address', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        forwardTo('checkout/promo');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
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
        console.log(orderLink);
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

function getCheckoutBilling(loggedIn, cart) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    if (loggedIn) {
      if (cart.bill_address) {
        const billing = {
          isLoaded: true,
          isEmpty: false,
          address: cart.bill_address,
        };
        dispatch(setBilling(billing));
      } else {
        axios.get('/api/addresses')
        .then((response) => checkResponse(response.data, () => {
          dispatch(setBilling(response.data.billing));
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
      }
    } else {
      const empty = {
        isLoaded: true,
        isEmpty: true,
        address: {},
      };
      dispatch(setBilling(empty));
    }
  };
}

function getCheckoutShipping(loggedIn, cart) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    if (loggedIn) {
      if (cart.ship_address) {
        const shipping = {
          isLoaded: true,
          isEmpty: false,
          address: cart.ship_address,
        };
        dispatch(setShipping(shipping));
      } else {
        axios.get('/api/addresses')
          .then((response) => checkResponse(response.data, () => {
            dispatch(setShipping(response.data.shipping));
          }, () => {
            dispatch(setMessage({ isError: true, messages: response.data.messages }));
          }))
          .catch((err) => {
            console.error('Error: ', err); // eslint-disable-line no-console
          });
      }
    } else {
      const empty = {
        isLoaded: true,
        isEmpty: true,
        address: {},
      };
      dispatch(setShipping(empty));
    }
  };
}

function setCheckoutBilling(address) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(address);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
      return false;
    }
    const billing = {
      isLoaded: true,
      isEmpty: false,
      address,
    };
    dispatch(setBilling(billing));
    dispatch(setMessage({ isError: false, messages: ['Billing address set successfully.'] }));
    forwardTo('checkout/shipping');
    return true;
  };
}

function setCheckoutShipping(address,) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(address);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
      return false;
    }
    const shipping = {
      isLoaded: true,
      isEmpty: false,
      address,
    };
    dispatch(setShipping(shipping));
    return true;
  };
}

export {
  getPayPalToken,
  checkoutPayPal,
  checkoutAddresses,
  checkoutNext,
  setCartState,
  getCheckoutBilling,
  getCheckoutShipping,
  setCheckoutBilling,
  setCheckoutShipping,
  completePayPal,
  setPayment,
};
