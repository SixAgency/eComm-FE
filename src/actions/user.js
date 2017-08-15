import axios from 'axios';
import pick from 'lodash.pick';
import { checkResponse, forwardTo } from './handler';
import { setMessage, resetMessages, setPending, toggleLoader } from './page';
import { getCart, resetCart, resetOrders } from './order';
import { validateAuth, validatePasswordEmail, testPasswordStrength, validateAccountUpdate } from '../helpers/validators';
import { ACTION_TYPES, DEFAULT_VALUES } from '../constants/StateConsts';

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

/** Set Store Credit - helper
* @param object
* @returns {{type: object, payload: object}}
*/
function setStoreCreditInfo(creditInfo) {
  return { type: 'SET_STORE_CREDIT_INFO', payload: { creditInfo } };
}

/** same here **/

function applyCredit(data) {
  return { type: 'APPLY_STORE_CREDIT', payload: { data } };
}

function checkUser(callback, redirect) {
  return (dispatch) => {
    axios.get('/api/check').then((response) => {
      const { user } = response.data;
      if (user && user.loggedIn) {
        return callback();
      }
      dispatch(setMessage({ isError: true, messages: ['Your session expired. Please login.'] }));
      return forwardTo(redirect);
    });
  };
}

function checkGuest(callback) {
  return (dispatch) => {
    axios.get('/api/check').then((response) => {
      const { user } = response.data;
      if (user && user.loggedIn) {
        dispatch(resetMessages());
        return forwardTo('my-account/dashboard');
      }
      return callback();
    });
  };
}

/**
 * Checks if the user is logged in or not
 * @returns {function(*)}
 */
function checkLogin() {
  return (dispatch) => {
    axios.get('/api/check')
      .then((response) => checkResponse(response.data, () => {
        const { user } = response.data;
        dispatch(setUser(user));
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
    dispatch({ type: `${ACTION_TYPES.address}_PENDING` });
    dispatch(setPending(true));
    axios.post('/api/logout', {})
      .then((response) => checkResponse(response.data, () => {
        // Set the current user
        dispatch(setUser(response.data.user));
        dispatch(setProfile({
          isLoaded: false,
          id: 0,
          email: '',
          f_name: '',
          l_name: ''
        }));
        // Reset the cart
        dispatch(resetCart());
        dispatch(resetOrders());
        dispatch({
          type: `${ACTION_TYPES.address}_FULFILLED`,
          payload: {
            data: {
              data: {
                billing: DEFAULT_VALUES.address,
                shipping: DEFAULT_VALUES.address
              }
            }
          }
        });
        dispatch(getCart(false));
        dispatch(setPending(false));
        forwardTo('my-account');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch({
          type: `${ACTION_TYPES.address}_FULFILLED`,
          payload: {
            data: {
              data: {
                billing: DEFAULT_VALUES.address,
                shipping: DEFAULT_VALUES.address
              }
            }
          }
        });
        dispatch(setPending(false));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        dispatch(setPending(false));
        dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
      });
  };
}

/**
 * Login - Login with an existing account
 * @param data
 * @returns {function(*=)}
 */
function onLogin(data, checkout) {
  return (dispatch) => {
    const valid = validateAuth(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch({ type: `${ACTION_TYPES.address}_PENDING` });
      axios.post('/api/login', data)
        .then((response) => checkResponse(response.data, () => {
          // Reset the cart
          dispatch(getCart(false));
          // Set the user
          dispatch(setUser(response.data.user));
          // Set user addresses
          dispatch({
            type: `${ACTION_TYPES.address}_FULFILLED`,
            payload: {
              data: {
                data: pick(response.data, ['billing', 'shipping'])
              }
            }
          });
          // Redirect to dashboard
          if (!checkout) {
            forwardTo('my-account/dashboard');
          }
        }, () => {
          dispatch(setMessage({ isError: true, messages: ['ERROR: Incorrect username or password.'] }));
          dispatch({
            type: `${ACTION_TYPES.address}_FULFILLED`,
            payload: {
              data: {
                data: {
                  billing: DEFAULT_VALUES.address,
                  shipping: DEFAULT_VALUES.address
                }
              }
            }
          });
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
function onRegister(data, redirect = false) {
  return (dispatch) => {
    const valid = validateAuth(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch({ type: `${ACTION_TYPES.address}_PENDING` });
      axios.post('/api/register', data)
        .then((response) => checkResponse(response.data, () => {
          // Reset the cart
          dispatch(getCart(false));
          // Set the user
          dispatch(setUser(response.data.user));
          dispatch(setProfile({
            isLoaded: false,
            email: data.email,
            id: 0,
            f_name: '',
            l_name: ''
          }));
          dispatch({
            type: `${ACTION_TYPES.address}_FULFILLED`,
            payload: {
              data: {
                data: {
                  billing: DEFAULT_VALUES.address,
                  shipping: DEFAULT_VALUES.address
                }
              }
            }
          });
          // Redirect to dashboard
          if (!redirect) {
            forwardTo('my-account/dashboard');
          }
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch({
            type: `${ACTION_TYPES.address}_FULFILLED`,
            payload: {
              data: {
                data: {
                  billing: DEFAULT_VALUES.address,
                  shipping: DEFAULT_VALUES.address
                }
              }
            }
          });
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
          f_name: response.data.profile.f_name || '',
          l_name: response.data.profile.l_name || '',
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
    const valid = validatePasswordEmail(data);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      axios.post('/api/my-account/reset-password', data)
        .then((response) => checkResponse(response.data, () => {
          dispatch(setMessage({ isError: false, messages: [response.data] }));
        }, () => {
          dispatch(setMessage({ isError: true, messages: [response.data.messages] }));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          forwardTo('error');
        });
    }
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
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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

function makeStoreCreditRequest(dispatch) {
  axios.get('/api/my-account/store-credit')
    .then((response) => checkResponse(response.data, () => {
      dispatch(setStoreCreditInfo(response.data));
    }, () => {
      dispatch(setMessage({ isError: true, messages: response.data.messages }));
    }))
    .catch((err) => {
      console.error('Error: ', err); // eslint-disable-line no-console
      forwardTo('error');
    });
}

// Get store credit information
function getStoreCredit() {
  return (dispatch) => makeStoreCreditRequest(dispatch);
}

// Redeem gift card
function redeemGiftCard(code) {
  return (dispatch) => {
    axios.post('/api/my-account/redeem-giftcard', { redemption_code: code })
      .then((response) => checkResponse(response.data, () => {
        window.scrollTo(0, 0);
        dispatch(getStoreCredit());
        dispatch(setMessage({ isError: false, messages: [response.data.data] }));
        dispatch(toggleLoader(false));
      }, () => {
        window.scrollTo(0, 0);
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
        forwardTo('error');
      });
  };
}

// Apply store credits
function applyStoreCredit(data) {
  return (dispatch) => {
    axios.post('/api/checkout/apply-credit', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch(applyCredit(response.data));
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
  onLogout,
  onLogin,
  onRegister,
  checkLogin,
  getProfile,
  updateProfile,
  updatePassword,
  resetPassword,
  setNewPassword,
  redeemGiftCard,
  getStoreCredit,
  applyStoreCredit,
  setUser,
  setProfile,
  checkUser,
  checkGuest
};
