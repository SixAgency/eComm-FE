import React from 'react';
import Promise from 'bluebird';
import { AES } from 'crypto-js';
import { setStore, getInitialStore } from '../../helpers/state';
import CartWrapper from '../../pages/Cart';
import { BREADCRUMBS } from '../../constants/AppConsts';

import { isPayPal } from '../common/helpers';
import { render, error } from '../common/render';
import { getSession } from '../session';
import { checkLogin } from '../users';
import { getBraintreeTokens } from '../checkout';

const initialStore = getInitialStore();
/**
 * Cart page handler
 * @param req
 * @param resp
 * @param next
 */
function cart(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getSession(req),
    getBraintreeTokens(req)
  ])
    .then(([user, order, tokens]) => {
      initialStore.user = user.user;
      initialStore.checkout.paypal = tokens;
      initialStore.cart.cartItems = order;
      initialStore.page.headerProps = {
        headerClass: 'default',
        activeSlug: '/'
      };
      const store = setStore(initialStore);
      const params = {
        title: 'Cart',
        description: '',
        header: 'default',
        active: '/',
        st: AES.encrypt(JSON.stringify(store), 'secret key 123').toString(),
        cartItems: order,
        content: <CartWrapper
          cartItems={order}
          loggedIn={user.user.loggedIn}
          breadcrumbs={BREADCRUMBS.cart}
          paypalObj={tokens}
          isPayPal={isPayPal(order.cart)}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

export default cart;
