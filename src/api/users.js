import { apiFetch } from '../core/fetch';

const LOGIN = '/login';
const LOGOUT = '/logout';
const REGISTER = '/signup';

// Helpers - TODO - MOVE TO utils.js or helpers.js
function handleError(error, response) {
  const resp = { data: { error }, status: 500 };
  response.json(resp);
}

function handleLogout(data, request, response) {
  const resp = { error: false, status: 200 };
  const sess = request.session;
  sess.token = null;
  sess.user = null;
  response.json(resp);
}

function handleSignSignup(data, request, response) {
  let resp = {};
  const sess = request.session;
  if (data.user) {
    const user = data.user.email.split('@')[0];
    resp = {
      error: false,
      username: user,
      status: 200,
    };
    sess.token = data.user.spree_api_key;
    sess.user = user;
  } else {
    resp = {
      error: true,
      message: response.error,
      status: 200,
    };
  }
  response.json(resp);
}

function parseResponse(response) {
  let resp = {};
  if ((response.status === 404) || (response.status === 500)) {
    resp = { error: 'Server Error. Please try again.' };
    return Promise.reject(resp);
  }
  console.log(response);
  resp = response.json();
  return Promise.resolve(resp);
}


// USER Login
function userLogin(request, response) {
  // TODO - ADD DATA VALIDATION
  const user = {
    spree_user: {
      email: request.body.username,
      password: request.body.password,
      remember_me: request.body.remember,
    },
  };

  apiFetch(LOGIN,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => handleSignSignup(resp, request, response))
  .catch((err) => handleError(err, response));
}

// USER Registration
function userRegistration(request, response) {
  // TODO - ADD DATA VALIDATION
  const user = {
    spree_user: {
      email: request.body.email,
      password: request.body.password,
      password_confirmation: request.body.password,
    },
  };

  apiFetch(REGISTER,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => handleSignSignup(resp, request, response))
  .catch((err) => handleError(err, response));
}

// USER Logout
function userLogout(request, response) {
  apiFetch(LOGOUT,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  .then((data) => parseResponse(data))
  .then((data) => handleLogout(data, request, response))
  .catch((err) => handleError(err, response));
}

function checkLogin(request, response) {
  const { token, user } = request.session;
  let resp = {};
  if (token && user) {
    resp = {
      logged: true,
      username: user,
    };
  } else {
    resp = { logged: false };
  }
  response.json(resp);
}

export { userLogin, userRegistration, userLogout, checkLogin };
