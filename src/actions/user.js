import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';
import { getCart, resetCart, resetOrders } from './order';
import { resetAddresses, setAddresses } from './address';
import { validateAuth, testPasswordStrength, validateAccountUpdate } from '../helpers/validators';

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
  return { type: 'SET_PROFILE', payload: { profile } };
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
        dispatch(getCart(false));
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
          dispatch(getCart(false));
          // Set the user
          dispatch(setUser(response.data.user));
          const addresses = {
            isLoaded: false,
            isEmpty: true,
            addresses: []
          };
          // Set billing and shipping addresses
          dispatch(setAddresses(response.data.billing, response.data.shipping, addresses));
          // Redirect to dashboard
          forwardTo('my-account/dashboard');
        }, () => {
          dispatch(setMessage({ isError: true, messages: ['ERROR: Incorrect username or password.'] }));
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
          dispatch(getCart(false));
          // Set the user
          dispatch(setUser(response.data.user));
          const addresses = {
            isLoaded: false,
            isEmpty: true,
            addresses: []
          };
          // Set billing and shipping addresses
          dispatch(setAddresses(response.data.billing, response.data.shipping, addresses));
          // Redirect to dashboard
          forwardTo('my-account/dashboard');
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
        const profile = {
          id: response.data.profile.id,
          f_name: response.data.profile.f_name,
          l_name: response.data.profile.l_name,
          email: response.data.profile.email,
          isLoaded: true
        };
        dispatch(setProfile(profile));
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
    const valid = validateAccountUpdate(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      axios.post('/api/profile', data)
        .then((response) => checkResponse(response.data, () => {
          dispatch(setMessage({ isError: false, messages: ['Account updated'] }));
          const profile = {
            id: response.data.profile.id,
            f_name: response.data.profile.f_name,
            l_name: response.data.profile.l_name,
            email: response.data.profile.email,
            isLoaded: true
          };
          dispatch(setProfile(profile));
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          forwardTo('error');
        });
    }
  };
}

function updatePassword(data) {
  return (dispatch) => {
    const valid = testPasswordStrength(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
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
    }
  };
}

// Reset Password - send email step
function resetPassword(data) {
  return (dispatch) => {
    axios.post('/api/my-account/reset-password', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(setMessage({ isError: false, messages: [response.data] }));
      }, () => {
        dispatch(setMessage({ isError: true, messages: [response.data] }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

// Reset Password - set new password step
function setNewPassword(data) {
  return (dispatch) => {
    if (data.passwords.password !== data.passwords.confirmPassword) {
      dispatch(setMessage({ isError: true, messages: ['Your password and password confirmation do not match'] }));
    } else {
      const userInfo = {
        spree_user: {
          reset_password_token: data.token,
          password: data.passwords.password
        }
      };
      axios.post('/api/my-account/set-new-password', userInfo)
        .then((response) => checkResponse(response.data, () => {
          dispatch(setMessage({ isError: false, messages: [response.data.data] }));
        }, () => {
          dispatch(setMessage({ isError: true, messages: [response.data.data] }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          forwardTo('error');
        });
    }
  };
}

// Redeem gift card
function redeemGiftCard(code) {
  return (dispatch) => {
    axios.post('/api/my-account/redeem-giftcard', { redemption_code: code })
      .then((response) => checkResponse(response.data, () => {
        window.scrollTo(0, 0);
        dispatch(setMessage({ isError: false, messages: [response.data.data] }));
      }, () => {
        window.scrollTo(0, 0);
        dispatch(setMessage({ isError: true, messages: [response.data.data] }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}


export {
  onLogout,
  onLogin,
  onRegister,
  checkLogin,
  getProfile,
  updateProfile,
  updatePassword,
  resetPassword,
  setNewPassword,
  redeemGiftCard
};
