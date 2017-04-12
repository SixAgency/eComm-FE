import React from 'react';
import Promise from 'bluebird';
import CartWrapper from '../../pages/Cart';
import { BREADCRUMBS } from '../../constants/AppConsts';

import { isPayPal } from '../common/helpers';
import { render, error } from '../common/render';
import { getSession } from '../session';
import { checkLogin } from '../users';


/**
 * Cart page handler
 * @param req
 * @param resp
 * @param next
 */
function cart(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getSession(req)
  ])
    .then(([user, order]) => {
      const params = {
        title: 'Cart',
        description: '',
        header: 'default',
        active: '/',
        content: <CartWrapper
          cartItems={order}
          loggedIn={user.user.loggedIn}
          breadcrumbs={BREADCRUMBS.cart}
          isPayPal={isPayPal(order.cart)}
        />
      };
      return render(req, resp, next, params);
    })
    .catch((err) => error(req, resp, next, err));
}

export default cart;
