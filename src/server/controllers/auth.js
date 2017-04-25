import React from 'react';
import Promise from 'bluebird';
import AccountWrapper from '../../pages/Account/Account';
import LostPasswordWrapper from '../../pages/Account/LostPassword';
import ResetPasswordWrapper from '../../pages/Account/ResetPassword';
import { BREADCRUMBS } from '../../constants/AppConsts';

import { render, error } from '../common/render';
import { checkLogin } from '../users';


/**
 * Login/Register page handler
 * @param req
 * @param resp
 * @param next
 */
function auth(req, resp, next) {
  Promise.all([
    checkLogin(req)
  ])
    .then(([user]) => {
      if (user && user.user.loggedIn) {
        return resp.redirect('/my-account/dashboard');
      }
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <AccountWrapper
          loggedIn={user.user.loggedIn}
          breadcrumbs={BREADCRUMBS.dashboard}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Forgot Password page handler
 * @param req
 * @param resp
 * @param next
 */
function password(req, resp, next) {
  Promise.all([
    checkLogin(req)
  ])
    .then(([user]) => {
      if (user && user.user.loggedIn) {
        return resp.redirect('/my-account/dashboard');
      }
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <LostPasswordWrapper
          loggedIn={user.user.loggedIn}
          breadcrumbs={BREADCRUMBS.lostPassword}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Reset Password page handler
 * @param req
 * @param resp
 * @param next
 */
function reset(req, resp, next) {
  Promise.all([
    checkLogin(req)
  ])
    .then(([user]) => {
      if (user && user.user.loggedIn) {
        return resp.redirect('/my-account/dashboard');
      }
      if (!req.params.param) {
        return resp.redirect('/my-account');
      }
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ResetPasswordWrapper
          loggedIn={user.user.loggedIn}
          breadcrumbs={BREADCRUMBS.lostPassword}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

export { auth, password, reset };
