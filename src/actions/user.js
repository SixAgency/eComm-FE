import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';
import { getCart, resetCart, resetOrders } from './order';
import { resetAddresses, setAddresses } from './address';
import { validateAuth } from '../helpers/validators';

/**
 * Set User - helper
 * @param user: object
 * @returns {{type: string, payload: object}}
 */
function setUser(user) {
  return { type: 'SET_USER', payload: user };
}

/** Set Profile - helper
* @param object
* @returns {{type: string, payload: object}}
*/
function setProfile(profile) {
  return { type: 'SET_PROFILE', payload: profile };
}

/**
 * Checks if the user is logged in or not
 * @returns {function(*)}
 */
function checkLogin() {
  return (dispatch) => {
    axios.get('/api/check')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setUser(response.data.user));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        dispatch(setUser({ loggedIn: false, username: '', email: '' }));
      });
  };
}

/**
 * Logout - reset cart, reset addresses
 * @returns {function(*=)}
 */
function onLogout() {
  return (dispatch) => {
    axios.post('/api/logout', {})
      .then((response) => checkResponse(response.data, () => {
        // Set the current user
        dispatch(setUser(response.data.user));
        // Reset the cart
        dispatch(resetCart());
        dispatch(resetOrders());
        dispatch(resetAddresses());
        forwardTo('my-account');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
      });
  };
}

/**
 * Login - Login with an existing account
 * @param data
 * @returns {function(*=)}
 */
function onLogin(data) {
  return (dispatch) => {
    const valid = validateAuth(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      axios.post('/api/login', data)
        .then((response) => checkResponse(response.data, () => {
          // Reset the cart
          dispatch(resetCart());
          // Set the user
          dispatch(setUser(response.data.user));
          const addresses = {
            isLoaded: false,
            isEmpty: true,
            addresses: [],
          };
          // Set billing and shipping addresses
          dispatch(setAddresses(response.data.billing, response.data.shipping, addresses));
          // Redirect to dashboard
          forwardTo('my-account/dashboard');
          // Get the user cart
          dispatch(getCart());
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
        });
    }
  };
}

/**
 * Register - Create a user account
 * @param data
 * @returns {function(*=)}
 */
function onRegister(data) {
  return (dispatch) => {
    const valid = validateAuth(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      axios.post('/api/register', data)
        .then((response) => checkResponse(response.data, () => {
          // Reset the cart
          dispatch(resetCart());
          // Set the user
          dispatch(setUser(response.data.user));
          const addresses = {
            isLoaded: false,
            isEmpty: true,
            addresses: [],
          };
          // Set billing and shipping addresses
          dispatch(setAddresses(response.data.billing, response.data.shipping, addresses));
          // Redirect to dashboard
          forwardTo('my-account/dashboard');
          // Get the user cart
          dispatch(getCart());
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
        });
    }
  };
}

function getProfile() {
  return (dispatch) => {
    axios.get('/api/profile')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setProfile(response.data.profile));
        console.log('ajung aici', response);
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

function updateProfile(data) {
  return (dispatch) => {
    axios.post('/api/profile', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setMessage({ isError: false, messages: ['Account updated'] }));
        dispatch(setProfile(response.data));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

function updatePassword(data) {
  return (dispatch) => {
    axios.post('/api/profile/password', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setMessage({ isError: false, messages: ['Password updated'] }));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}


export { onLogout, onLogin, onRegister, checkLogin, getProfile, updateProfile, updatePassword };
