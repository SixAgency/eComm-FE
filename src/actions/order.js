import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage, setLoader, resetMessages, setPending } from './page';
import { validateShippingCalculator, validatePromoCode } from '../helpers/validators';


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
    cart: {}
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
 * Set Cart Pending
 * @param pending - bool
 * @returns {{type: string, payload: *}}
 */
function setCartPending(pending) {
  return { type: 'CART_PENDING', payload: pending };
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
    ...order
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
    ...orders
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
    orders: []
  };
  return { type: 'GET_ORDERS', payload: data };
}

/**
 * Get the user cart
 * @returns {function(*=)}
 */
function getCart(isNew, fn) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.cart.isCartPending) {
      dispatch(setCartPending(true));
      dispatch(setPending(true));
      axios.get(`/api/cart/${isNew}`)
        .then((response) => checkResponse(response.data, () => {
          dispatch(setCart(response.data));
          dispatch(setCartPending(false));
          dispatch(setPending(false));
          if (fn) {
            fn();
          }
        }, () => {
          dispatch(setCartPending(false));
          dispatch(setPending(false));
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          dispatch(resetCart());
          dispatch(setCartPending(false));
          dispatch(setPending(false));
        });
    }
  };
}

function getOrder(args) {
  const { number, guest_token } = args;
  let url = `/api/order/${number}`;
  if (guest_token) {
    url = `${url}?guest_token=${guest_token}`;
  }
  return (dispatch) => {
    axios.get(url)
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
    dispatch(setLoader(true, data.image));
    dispatch(setCartPending(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.post('/api/cart', { id: data.id, quantity: data.quantity })
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data.cart));
        const singleMessage = `"${response.data.name}" has been added to your cart.`;
        const multipleMessage = `${data.quantity} x "${response.data.name}" have been added to your cart.`;
        const message = data.quantity > 1 ? multipleMessage : singleMessage;
        dispatch(setMessage({ isError: false, messages: [message] }));
        dispatch(setCartPending(false));
        forwardTo('cart');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setCartPending(false));
        forwardTo('cart');
      }))
      .catch((err) => {
        dispatch(setCartPending(false));
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

function removePromoCode(message) {
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(setCartPending(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.put('/api/removecode')
      .then((response) => checkResponse(response.data, () => {
        const messages = message ? [message] : ['Promotion has been removed.'];
        dispatch(setMessage({ isError: false, messages }));
        dispatch(setCart(response.data));
        dispatch(setCartPending(false));
      }, () => {
        const messages = response.data.messages || ['Something went wrong.'];
        dispatch(setMessage({ isError: true, messages }));
        dispatch(setCartPending(false));
      }))
      .catch((err) => {
        console.error('Error', err); // eslint-disable-line no-console
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
    dispatch(setCartPending(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.post('/api/cart/remove', data)
      .then((response) => checkResponse(response.data, () => {
        const message = `${response.data.name} removed.`;
        dispatch(setMessage({ isError: false, messages: [message] }));
        if (response.data.cart.cart.line_items.length) {
          dispatch(setCart(response.data.cart));
          dispatch(setCartPending(false));
        } else {
          dispatch(removePromoCode(message));
        }
        forwardTo('cart');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setCartPending(false));
        forwardTo('cart');
      }))
      .catch((err) => {
        dispatch(setCartPending(false));
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
    dispatch(setCartPending(true));
    dispatch(setPending(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    axios.put('/api/cart', { data })
      .then((response) => checkResponse(response.data, () => {
        console.log('RESPONSE', response.data);
        const message = 'Cart updated.';
        dispatch(setMessage({ isError: false, messages: [message] }));
        dispatch(setCart(response.data));
        dispatch(setCartPending(false));
        dispatch(setPending(false));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setCartPending(false));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        dispatch(setCartPending(false));
        dispatch(setPending(false));
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
function applyPromoCode(data, callback) {
  return (dispatch) => {
    dispatch(setPending(true));
    window.scrollTo(0, 0);
    dispatch(resetMessages());
    const valid = validatePromoCode(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      axios.put('/api/applycode', { coupon_code: data })
        .then((response) => checkResponse(response.data, () => {
          dispatch(setMessage({ isError: false, messages: ['Code has been applied.'] }));
          callback(false);
        }, () => {
          const messages = response.data.messages || ['Something went wrong.'];
          dispatch(setMessage({ isError: true, messages }));
          dispatch(setPending(false));
        }))
        .catch((err) => {
          console.error('Error', err); // eslint-disable-line no-console
          forwardTo('error');
        });
    }
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

function calculateShipping(data) {
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(setCartPending(true));
    window.scrollTo(0, 0);
    const valid = validateShippingCalculator(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
      dispatch(setCartPending(false));
    } else {
      axios.post('/api/calculate_shipping', { data })
        .then((response) => checkResponse(response.data, () => {
          dispatch(setCart(response.data));
          dispatch(setCartPending(false));
          dispatch(setMessage({ isError: false, messages: ['Shipping costs updated'] }));
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch(setCartPending(false));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          forwardTo('error');
        });
    }
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
  removePromoCode,
  getOrder,
  setOrder,
  resetOrders,
  getAllOrders,
  calculateShipping
};
