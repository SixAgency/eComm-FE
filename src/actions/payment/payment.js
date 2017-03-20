import axios from 'axios';
import { resetMessages, setMessage, setPending } from '../page';
import { checkResponse, forwardTo } from '../handler';
import { setCart } from '../order';

/**
 * Set square as payment method
 * @returns {function(*=)}
 */
function checkoutSquare(data) {
  return (dispatch) => {
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.post('/api/checkout/square', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        dispatch(setPending(false));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        dispatch(setPending(false));
        console.error('Error: ', err);
      });
  };
}

/**
 * @TODO - move PayPal here
 * @returns {function(*)}
 */
function checkoutPayPal() {
  return (dispatch) => {
    dispatch('TEST_PAYMENT', 'paypal');
  };
}

export { checkoutPayPal, checkoutSquare };
