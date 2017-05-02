import axios from 'axios';
import { resetMessages, setMessage, setPending, toggleLoader } from '../page';
import { checkResponse, forwardTo } from '../handler';
import { setCart, setOrder, getCart, setPayment } from '../order';
import { checkIfPayPal } from '../../utils/utils';

/**
 * Set square as payment method
 * @returns {function(*=)}
 */
function checkoutSquare(data) {
  return (dispatch) => {
    window.scrollTo(0, 0);
    dispatch(toggleLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/square', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        dispatch(setPending(false));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(toggleLoader(false));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        dispatch(setPending(false));
        dispatch(toggleLoader(false));
        console.error('Error: ', err);
      });
  };
}

/**
 * Reset the order to address state and invalidate payment methods
 * @returns {function(*=)}
 */
function checkoutReset() {
  return (dispatch) => {
    window.scrollTo(0, 0);
    dispatch(toggleLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/reset')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        const isPayPal = checkIfPayPal(response.data.cart);
        dispatch(setPayment(isPayPal));
        forwardTo('cart');
        dispatch(setPending(false));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(toggleLoader(false));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        dispatch(setPending(false));
        dispatch(toggleLoader(false));
        console.error('Error: ', err);
      });
  };
}

function placeOrderSuccessCallback(response, dispatch) {
  const order = {
    isEmpty: response.data.isEmpty,
    order: response.data.cart
  };
  dispatch(setOrder(order));
  const orderLink = `my-account/view-order/${response.data.cart.number}`;
  forwardTo(orderLink);
  dispatch(setMessage({ isError: false, messages: ['Your purchase completed successfully.'] }));
  dispatch(getCart(true));
}

function placeOrderFailureCallback(response, dispatch) {
  dispatch(setMessage({ isError: true, messages: response.data.messages }));
  dispatch(setPending(false));
  dispatch(toggleLoader(false));
}

function makePlaceOrderRequest(dispatch) {
  axios.post('/api/checkout/confirm')
    .then((response) => checkResponse(
      response.data,
      () => placeOrderSuccessCallback(response, dispatch),
      () => placeOrderFailureCallback(response, dispatch)
    ))
    .catch((err) => {
      dispatch(setPending(false));
      dispatch(toggleLoader(false));
      console.error('Error: ', err);
    });
}

function makeToggleCreditRequest(value) {
  return (dispatch) => {
    dispatch(toggleLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/apply-credit', { apply_store_credit: value })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setPending(false));
        dispatch(toggleLoader(false));
        dispatch(setCart(response.data));
      }, () => {
        dispatch(setPending(false));
        dispatch(toggleLoader(false));
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        dispatch(setPending(false));
        dispatch(toggleLoader(false));
        forwardTo('error');
      });
  };
}

function confirmOrderWithCreditsOnly(dispatch) {
  axios.post('/api/checkout/apply-credit', { apply_store_credit: true })
    .then((response) => checkResponse(
      response.data,
      () => placeOrderSuccessCallback(response, dispatch),
      () => placeOrderFailureCallback(response, dispatch)
    ))
    .catch((err) => {
      dispatch(setPending(false));
      dispatch(toggleLoader(false));
      console.error('Error: ', err);
    });
}

/**
 * Finish order
 * @returns {function(*=)}
 */
function confirmOrder(useCredits = false, fullyCoveredByCredits = false) {
  return (dispatch) => {
    window.scrollTo(0, 0);
    dispatch(toggleLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    if (useCredits) {
      if (fullyCoveredByCredits) {
        confirmOrderWithCreditsOnly(dispatch);
      } else {
        makePlaceOrderRequest(dispatch);
      }
    } else {
      makePlaceOrderRequest(dispatch);
    }
  };
}

export { checkoutReset, checkoutSquare, confirmOrder, makeToggleCreditRequest };
