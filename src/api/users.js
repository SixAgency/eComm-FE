import { apiFetch } from '../core/fetch';
import { parseError, parseResponse, handleAuth, handleLogout } from './handlers';

const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/signup';

// USER Login
function userLogin(request) {
  // @TODO - add data validation
  const user = {
    spree_user: {
      email: request.body.username,
      password: request.body.password,
      remember_me: request.body.remember,
    },
  };
  const response = apiFetch(LOGIN,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then(resp => parseResponse(resp))
  .then(resp => handleAuth(resp, request))
  .catch(err => parseError(err));

  return response;
}

// USER Registration
function userRegistration(request) {
  // TODO - add data validation
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
  .then(resp => parseResponse(resp))
  .then(resp => handleAuth(resp, request))
  .catch(err => parseError(err));
}

// USER Logout
function userLogout(request) {
  return apiFetch(LOGOUT,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then(data => parseResponse(data))
  .then(data => handleLogout(data, request))
  .catch(err => parseError(err));
}

// USER - Check if logged in
function checkLogin(request) {
  const p1 = new Promise((resolve, reject) => {
    try {
      const { token, userName, emailAddress, loggedIn } = request.session;
      let resp = {};
      if (token && userName && emailAddress) {
        resp = {
          userName,
          emailAddress,
          loggedIn,
        };
      } else {
        resp = { loggedIn: false };
      }
      resolve(resp);
    } catch (err) {
      reject(err);
    }
  }).then(resp => resp).catch(err => err);
  return p1;
}

export { userLogin, userRegistration, userLogout, checkLogin };
