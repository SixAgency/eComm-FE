import React from 'react';
import Promise from 'bluebird';
import { AES } from 'crypto-js';
import { setStore, getInitialStore } from '../../helpers/state';
import HomeWrapper from '../../pages/Home';
import BiographyWrapper from '../../pages/Biography';
import ContactWrapper from '../../pages/Contact';

import { render, error } from '../common/render';
import { checkLogin } from '../users';
import { getProducts } from '../products';
import { getSession } from '../session';


/**
 * Homepage handler
 * @param req
 * @param resp
 * @param next
 */

const initialStore = getInitialStore();

function home(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getProducts(req),
    getSession(req)
  ]).then(([user, products, cart]) => {
    initialStore.user = user.user;
    initialStore.catalog.gridItems = products;
    initialStore.cart.cartItems = cart;
    initialStore.page.headerProps = {
      headerClass: 'default',
      activeSlug: '/'
    };
    const store = setStore(initialStore);
    const params = {
      title: 'Shop',
      description: '',
      header: 'default',
      active: '/',
      st: AES.encrypt(JSON.stringify(store), 'secret key 123').toString(),
      cartItems: cart,
      content: <HomeWrapper gridItems={products} />
    };
    return render(req, resp, next, params);
  }).catch((err) => error(req, resp, next, err));
}

/**
 * Biography page handler
 * @param req
 * @param resp
 * @param next
 * @returns {*}
 */
function biography(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getSession(req)
  ]).then(([user, cart]) => {
    initialStore.user = user.user;
    initialStore.cart.cartItems = cart;
    initialStore.page.headerProps = {
      headerClass: 'default',
      activeSlug: '/biography'
    };
    const store = setStore(initialStore);
    const params = {
      title: 'Biography',
      description: '',
      header: 'default',
      active: '/biography',
      st: AES.encrypt(JSON.stringify(store), 'secret key 123').toString(),
      cartItems: cart,
      content: <BiographyWrapper />
    };
    return render(req, resp, next, params);
  }).catch((err) => error(req, resp, next, err));
}

/**
 * Contact page handler
 * @param req
 * @param resp
 * @param next
 * @returns {*}
 */
function contact(req, resp, next) {
  Promise.all([
    checkLogin(req),
    getSession(req)
  ]).then(([user, cart]) => {
    initialStore.user = user.user;
    initialStore.cart.cartItems = cart;
    initialStore.page.headerProps = {
      headerClass: 'colored',
      activeSlug: '/contact'
    };
    const store = setStore(initialStore);
    const params = {
      title: 'Contact',
      description: '',
      header: 'colored',
      active: '/contact',
      st: AES.encrypt(JSON.stringify(store), 'secret key 123').toString(),
      cartItems: cart,
      content: <ContactWrapper />
    };
    return render(req, resp, next, params);
  }).catch((err) => error(req, resp, next, err));
}

export { home, biography, contact };
