import { apiFetch } from '../core/fetch';
// Helpers
import { checkResponse, setError, setAuthResponse, setLogoutResponse, setUserResponse } from './helpers/handlers';

const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/signup';


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

export { userLogin, userRegistration, userLogout, checkLogin };
