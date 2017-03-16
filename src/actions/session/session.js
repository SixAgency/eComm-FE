import axios from 'axios';

/**
 * Set Cart Pending
 * @param pending - bool
 * @returns {{type: string, payload: *}}
 */
function setCartPending(pending) {
  return { type: 'SET_CART_PENDING', payload: pending };
}

/**
 * Set Cart Pending
 * @param pending - bool
 * @returns {{type: string, payload: *}}
 */
function setCart(data) {
  const cart = {
    isLoaded: true,
    isEmpty: data.isEmpty,
    cart: data.data
  };
  return { type: 'SET_CART', payload: cart };
}

/**
 * Get the session and set the user and cart
 * @returns {function(*=)}
 */
function getSession() {
  return (dispatch) => {
    dispatch(setCartPending(true));
    axios.get('/api/session')
      .then((response) => {
        dispatch(setCart(response.data));
        dispatch(setCartPending(false));
      })
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

export default getSession;
