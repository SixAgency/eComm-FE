import React from 'react';
import Promise from 'bluebird';
import DashboardWrapper from '../../pages/Account/Dashboard';
import ProfileWrapper from '../../pages/Account/Profile/Profile';
import PasswordWrapper from '../../pages/Account/Profile/Password';
import ShippingWrapper from '../../pages/Account/Shipping';
import BillingWrapper from '../../pages/Account/Billing';
import ViewOrderWrapper from '../../pages/Account/ViewOrder';
import GiftCardWrapper from '../../pages/Account/GiftCard';

import { DEFAULT_VALUES } from '../../constants/StateConsts';
import { BREADCRUMBS } from '../../constants/AppConsts';

import { render, error } from '../common/render';
import { getProfile, getStoreCreditInfo, checkLogin } from '../users';
import { getAddresses } from '../addresses';
import { getOrders, getOrder } from '../orders';

/**
 * Middleware to check if the user is logged in
 * @param req
 * @param resp
 * @param next
 */
function checkUser(req, resp, next) {
  if (req.session.user_token) {
    return next();
  }
  return resp.redirect('/my-account');
}

/**
 * Account Dashboard handler
 * @param req
 * @param resp
 * @param next
 */
function dashboard(req, resp, next) {
  Promise.all([
    getProfile(req),
    getAddresses(req),
    getOrders(req),
    getStoreCreditInfo(req)
  ])
    .then(([user, addresses, orders, credit]) => {
      let addr = addresses.data;
      if (addresses.data.isError) {
        addr = {
          billing: DEFAULT_VALUES.address,
          shipping: DEFAULT_VALUES.address
        };
      }
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <DashboardWrapper
          profile={user}
          addresses={addr}
          orders={orders}
          creditInfo={credit}
          breadcrumbs={BREADCRUMBS.dashboard}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Edit Account handler
 * @param req
 * @param resp
 * @param next
 */
function editAccount(req, resp, next) {
  Promise.all([
    getProfile(req)
  ])
    .then(([user]) => {
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ProfileWrapper
          profile={user}
          breadcrumbs={BREADCRUMBS.editAccount}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Edit Password handler
 * @param req
 * @param resp
 * @param next
 */
function editPassword(req, resp, next) {
  Promise.all([
    getProfile(req)
  ])
    .then(([user]) => {
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <PasswordWrapper
          profile={user}
          breadcrumbs={BREADCRUMBS.editAccount}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Edit Shipping Address handler
 * @param req
 * @param resp
 * @param next
 */
function editShipping(req, resp, next) {
  Promise.all([
    getAddresses(req)
  ])
    .then(([addresses]) => {
      let addr = addresses.data;
      if (addresses.data.isError) {
        addr = {
          billing: DEFAULT_VALUES.address,
          shipping: DEFAULT_VALUES.address
        };
      }
      const params = {
        title: 'Edit Shipping Address',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ShippingWrapper
          addresses={addr}
          breadcrumbs={BREADCRUMBS.addresses}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Edit Billing Address handler
 * @param req
 * @param resp
 * @param next
 */
function editBilling(req, resp, next) {
  Promise.all([
    getAddresses(req)
  ])
    .then(([addresses]) => {
      let addr = addresses.data;
      if (addresses.data.isError) {
        addr = {
          billing: DEFAULT_VALUES.address,
          shipping: DEFAULT_VALUES.address
        };
      }
      const params = {
        title: 'Edit Billing Address',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <BillingWrapper
          addresses={addr}
          breadcrumbs={BREADCRUMBS.addresses}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * View Order handler
 * @param req
 * @param resp
 * @param next
 */
function viewOrder(req, resp, next) {
  Promise.all([
    getOrder(req),
    checkLogin(req)
  ])
    .then(([order, user]) => {
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ViewOrderWrapper
          order={order}
          loggedIn={user.user.loggedIn}
          breadcrumbs={BREADCRUMBS.viewOrder}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Redeem Gift Card handler
 * @param req
 * @param resp
 * @param next
 */
function giftCard(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getProfile(req),
    getStoreCreditInfo(req)
  ])
    .then(([user, credit]) => {
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <GiftCardWrapper
          profile={user}
          loggedIn={user.user.loggedIn}
          creditInfo={credit}
          breadcrumbs={BREADCRUMBS.giftCard}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

export {
  checkUser,
  dashboard,
  editAccount,
  editPassword,
  giftCard,
  editShipping,
  editBilling,
  viewOrder
};
