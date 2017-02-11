import { apiFetch } from '../core/fetch';
// Helpers
import {
  checkResponse,
  setError,
  setAuthResponse,
  setLogoutResponse,
  setUserResponse,
  parseProfile } from './helpers/handlers';
import { faketoken } from '../config';
import conslog from '../utils/dev';

const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/signup';
const PROFILE = '/api/v1/users';

// Login
function userLogin(request) {
  const user = {
    spree_user: {
      email: request.body.email,
      password: request.body.password,
      remember_me: request.body.remember || 0,
    },
  };
  return apiFetch(LOGIN,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((response) => checkResponse(response))
  .then((data) => setAuthResponse(data, request))
  .catch((err) => setError(err));
}

// Registration
function userRegistration(request) {
  const user = {
    spree_user: {
      email: request.body.email,
      password: request.body.password,
      password_confirmation: request.body.password,
    },
  };
  return apiFetch(REGISTER,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((response) => checkResponse(response))
  .then((data) => setAuthResponse(data, request))
  .catch((err) => setError(err));
}

// Logout
function userLogout(request) {
  return apiFetch(LOGOUT,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((resp) => checkResponse(resp))
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
  return apiFetch(PROFILE,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((resp) => (checkResponse(resp)))
  .then((resp) => (parseProfile(resp)))
  .catch((err) => setError(err));
}

// Update User Profile
function updateProfile(request) {
  conslog('SESSION', request.session);
  const profile = { ...request.body };
  return apiFetch(`${PROFILE}/${profile.id}`,
    {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || faketoken,
      },
    })
  .then((resp) => (checkResponse(resp)))
  .then((resp) => (resp))
  .catch((err) => setError(err));
}

export { userLogin, userRegistration, userLogout, checkLogin, getProfile, updateProfile };
