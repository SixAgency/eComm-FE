import { apiFetch } from './fetch';
// Helpers
import {
  checkResponse,
  setError,
  setAuthResponse,
  setLogoutResponse,
  setUserResponse,
  parseProfile,
  parseProfileUpdate,
  parsePasswordUpdate,
  parseResetResponse,
  parseNewPasswordResponse,
  parseGiftRedeemResponse,
  parseStoreCredit
} from './helpers/handlers';

const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/signup';
const PROFILE = '/api/v1/users';

/* Do login (helper) */
function doLogin(request, user, callback) {
  let status;
  return apiFetch(LOGIN,
    {
      method: 'POST',
      body: JSON.stringify(user)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => {
      if (callback) {
        setAuthResponse(data, request);
        return callback();
      }
      return setAuthResponse(data, request);
    })
    .catch((err) => setError(err));
}

// Login
function userLogin(request) {
  const user = {
    spree_user: {
      email: request.body.email,
      password: request.body.password,
      remember_me: request.body.remember || 0
    }
  };
  if (!request.session.user_token) {
    user.guest_token = request.session.guest_token;
  }
  return doLogin(request, user);
}

// Registration
function userRegistration(request) {
  let status;
  const user = {
    spree_user: {
      email: request.body.email,
      password: request.body.password,
      password_confirmation: request.body.password
    }
  };
  if (!request.session.user_token) {
    user.guest_token = request.session.guest_token;
  }
  return apiFetch(REGISTER,
    {
      method: 'POST',
      body: JSON.stringify(user)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => setAuthResponse(data, request))
    .catch((err) => setError(err));
}

// Logout
function userLogout(request) {
  let status;
  return apiFetch(LOGOUT, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then(() => setLogoutResponse(request))
    .catch((err) => setError(err));
}

// User Check based on session
function checkLogin(request) {
  return setUserResponse(request)
    .then(resp => resp)
    .catch((err) => setError(err));
}

// Get User Profile
function getProfile(request) {
  let status;
  return apiFetch(PROFILE, {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => (parseProfile(resp)))
    .catch((err) => setError(err));
}

// Update User Profile
function updateProfile(request) {
  let status;
  const profile = { ...request.body };
  return apiFetch(`${PROFILE}/${profile.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(profile)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => (parseProfileUpdate(resp)))
    .catch((err) => setError(err));
}

// Update User Password
function updatePassword(request) {
  let status;
  const data = {
    user: request.body.passwords
  };
  return apiFetch(`${PROFILE}/${request.body.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => (parsePasswordUpdate(resp)))
    .catch((err) => setError(err));
}

// Send instruction mail for reset password
function resetPassword(request) {
  let status;
  const data = { ...request.body };
  return apiFetch('/password/recover',
    {
      method: 'POST',
      body: JSON.stringify(data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => (parseResetResponse(resp)))
    .catch((err) => setError(err));
}

// Set new password after receiving the email instructions
function setNewPassword(request) {
  let status;
  const data = { ...request.body };
  return apiFetch('/user/spree_user/password',
    {
      method: 'PATCH',
      body: JSON.stringify(data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => {
      setAuthResponse(resp, request);
      return parseNewPasswordResponse(resp);
    })
    .catch((err) => setError(err));
}

// Redeem gift card
function redeemGiftCard(request) {
  let status;
  const data = { ...request.body };
  return apiFetch('/api/v1/gift_cards/redeem',
    {
      method: 'POST',
      body: JSON.stringify(data)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => (parseGiftRedeemResponse(resp)))
    .catch((err) => setError(err));
}


// Get store credit value
function getStoreCreditInfo(request) {
  let status;
  return apiFetch('/api/v1/store_credit_events/mine', {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => (checkResponse(json, status)))
    .then((resp) => (parseStoreCredit(resp)))
    .catch((err) => setError(err));
}

export {
  userLogin,
  userRegistration,
  userLogout,
  checkLogin,
  getProfile,
  updateProfile,
  updatePassword,
  resetPassword,
  setNewPassword,
  redeemGiftCard,
  getStoreCreditInfo
};
