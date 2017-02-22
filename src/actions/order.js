import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage, setLoader, resetMessages } from './page';
import { setPayment, setShipping, setBilling } from './checkout';
import { getCartAddresses } from '../helpers/feed';


/**
 * Helper
 */
/**
 * Helper - Empty Cart
 * @returns {{type: string, payload: {isEmpty: boolean, isLoaded: boolean, cart: {}}}}
 */
function resetCart() {
  const data = {
    isEmpty: true,
    isLoaded: true,
    cart: {},
  };
  return { type: 'SET_CART', payload: data };
}

/**
 * Set Cart
 * @param cart
 * @returns {{type: string, payload: *}}
 */
function setCart(cart) {
  const data = { ...cart, isLoaded: true };
  return { type: 'SET_CART', payload: data };
}

/**
 * Set line items quantity
 * @param data
 * @returns {function(*)}
 */
function updateQuantity(data) {
  return (dispatch) => {
    dispatch(setCart(data));
  };
}

function setOrder(order) {
  const data = {
    isLoaded: true,
    ...order,
  };
  return { type: 'SET_ORDER', payload: data };
}

/**
* Helper - Set orders
* @returns {{type: string, payload: {}}}
*/
function setOrders(orders) {
  const data = {
    isLoaded: true,
    ...orders,
  };
  return { type: 'GET_ORDERS', payload: data };
}

/**
 * Helper - Set orders
 * @returns {{type: string, payload: {}}}
 */
function resetOrders() {
  const data = {
    isLoaded: true,
    isEmpty: true,
    orders: [],
  };
  return { type: 'GET_ORDERS', payload: data };
}

/**
 * Get the user cart
 * @returns {function(*=)}
 */
function getCart() {
  return (dispatch) => {
    axios.get('/api/cart')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        const addresses = getCartAddresses(response.data);
        dispatch(setBilling(addresses.billing));
        dispatch(setShipping(addresses.shipping));
        // dispatch(setCartState(response.data.cart.state));
        const isPayPal = (response.data.cart.state !== 'cart' && response.data.cart.payments.length > 0);
        dispatch(setPayment(isPayPal));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        dispatch(resetCart());
      });
  };
}

function getOrder(number) {
  return (dispatch) => {
    axios.get(`/api/order/${number}`)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setOrder(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error', err);
        forwardTo('error');
      });
  };
}

/**
 * Add item to cart
 * @param data
 * @returns {function(*=)}
 */
function addToCart(data) {
  return (dispatch) => {
    dispatch(setLoader(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
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

/**
 * Remove item from the cart
 * @param data
 * @returns {function(*=)}
 */
function removeItem(data) {
  return (dispatch) => {
    dispatch(setLoader(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.post('/api/cart/remove', data)
      .then((response) => checkResponse(response.data, () => {
        const message = `${response.data.name} has been removed from your cart.`;
        dispatch(setMessage({ isError: false, messages: [message] }));
        dispatch(setCart(response.data.cart));
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

/**
 * Update Cart
 * @param data
 * @returns {function(*=)}
 */
function updateCart(data) {
  return (dispatch) => {
    dispatch(setLoader(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.put('/api/cart', { data })
      .then((response) => checkResponse(response.data, () => {
        const message = 'Cart updated.';
        dispatch(setMessage({ isError: false, messages: [message] }));
        dispatch(setCart(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

/**
 * Apply promo code
 * @param data
 * @returns {function(*)}
 */
function applyPromoCode(data) {
  return (dispatch) => {
    dispatch(setLoader(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.put('/api/applycode', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setMessage({ isError: false, messages: ['Code has been applied.'] }));
      }, () => {
        const message = response.data.messages || 'Something went wrong.';
        dispatch(setMessage({ isError: true, messages: [message] }));
      }))
      .catch((err) => {
        console.error('Error', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

/** Get all orders
* @param data
* @returns {function(*)}
*/
function getAllOrders(data) {
  return (dispatch) => {
    axios.get('/api/orders', { data })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setOrders(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

export {
  getCart,
  addToCart,
  removeItem,
  updateCart,
  updateQuantity,
  resetCart,
  setCart,
  applyPromoCode,
  getOrder,
  resetOrders,
  getAllOrders,
};

