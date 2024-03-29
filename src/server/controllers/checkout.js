import React from 'react';
import Promise from 'bluebird';

// Components
import BillingWrapper from '../../pages/Checkout/Billing';
import ShippingWrapper from '../../pages/Checkout/Shipping';
import PromoWrapper from '../../pages/Checkout/Promo';
import ReviewWrapper from '../../pages/Checkout/Review';

import { BREADCRUMBS } from '../../constants/AppConsts';
import { DEFAULT_VALUES } from '../../constants/StateConsts';

import { render, error } from '../common/render';
import { checkLogin } from '../users';
import { getAddresses } from '../addresses';
import { getSession } from '../session';
import { checkPayment, checkIfCanUseStoreCredit } from '../../utils/utils';

/**
 * Checkout Billing handler
 * @param req
 * @param resp
 * @param next
 */
function checkoutBilling(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getAddresses(req),
    getSession(req)
  ])
    .then(([user, addresses, cart]) => {
      let addr = addresses.data;
      if (addresses.data.isError) {
        addr = {
          billing: DEFAULT_VALUES.address,
          shipping: DEFAULT_VALUES.address
        };
      }
      const params = {
        title: 'Checkout Billing',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <BillingWrapper
          loggedIn={user.user.loggedIn}
          addresses={addr}
          cartItems={cart}
          breadcrumbs={BREADCRUMBS.checkout}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Checkout Shipping handler
 * @param req
 * @param resp
 * @param next
 */
function checkoutShipping(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getAddresses(req),
    getSession(req)
  ])
    .then(([user, addresses, cart]) => {
      let addr = addresses.data;
      if (addresses.data.isError) {
        addr = {
          billing: DEFAULT_VALUES.address,
          shipping: DEFAULT_VALUES.address
        };
      }
      const params = {
        title: 'Checkout Shipping',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ShippingWrapper
          loggedIn={user.user.loggedIn}
          addresses={addr}
          cartItems={cart}
          breadcrumbs={BREADCRUMBS.checkout}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Checkout Promo handler
 * @param req
 * @param resp
 * @param next
 */
function checkoutPromo(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getSession(req)
  ])
    .then(([user, cart]) => {
      const params = {
        title: 'Checkout Promo',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <PromoWrapper
          loggedIn={user.user.loggedIn}
          cartItems={cart}
          breadcrumbs={BREADCRUMBS.checkout}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

/**
 * Checkout Review handler
 * @param req
 * @param resp
 * @param next
 */
function checkoutReview(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getSession(req)
  ])
    .then(([user, cart]) => {
      const params = {
        title: 'Checkout Review',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ReviewWrapper
          loggedIn={user.user.loggedIn}
          cartItems={cart}
          isStoreCredit={checkPayment(cart.cart, 'Spree::StoreCredit')}
          canUseStoreCredit={checkIfCanUseStoreCredit(cart)}
          breadcrumbs={BREADCRUMBS.checkout}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

export {
  checkoutBilling,
  checkoutShipping,
  checkoutPromo,
  checkoutReview
};
