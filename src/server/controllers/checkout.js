import React from 'react';
import Promise from 'bluebird';

// Components
import BillingWrapper from '../../pages/Checkout/Billing';
import ShippingWrapper from '../../pages/Checkout/Shipping';
import PromoWrapper from '../../pages/Checkout/Promo';
import ReviewWrapper from '../../pages/Checkout/Review';

import { BREADCRUMBS } from '../../constants/AppConsts';

import { render, error } from '../common/render';
import { checkLogin } from '../users';
import { getAddresses } from '../addresses';
import { getSession } from '../session';

/**
 * Helper method to determine if PayPal is used as payment method
 * @param cart
 * @returns {boolean}
 */
function isPayPal(cart) {
  const paypal = cart.payments.filter(({ payment_method, state }) => (state !== 'invalid' && payment_method.name === 'Paypal'));
  return (paypal.length > 0);
}

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
      const params = {
        title: 'Checkout Billing',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <BillingWrapper
          loggedIn={user.user.loggedIn}
          addresses={addresses.addresses}
          cartItems={cart}
          isPayPal={isPayPal(cart.cart)}
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
      const params = {
        title: 'Checkout Shipping',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ShippingWrapper
          loggedIn={user.user.loggedIn}
          addresses={addresses.addresses}
          cartItems={cart}
          isPayPal={isPayPal(cart.cart)}
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
          isPayPal={isPayPal(cart.cart)}
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
          isPayPal={isPayPal(cart.cart)}
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
