import React from 'react';
import Promise from 'bluebird';
import HomeWrapper from '../../pages/Home';
import BiographyWrapper from '../../pages/Biography';
import ContactWrapper from '../../pages/Contact';

import { render, error } from '../common/render';
import { getProducts } from '../products';
import { getSession } from '../session';


/**
 * Homepage handler
 * @param req
 * @param resp
 * @param next
 */
function home(req, resp, next) {
  Promise.all([
    getSession(req),
    getProducts(req)
  ]).then(([cart, products]) => {
    const gridItems = { ...products, isLoaded: !products.isError };
    const params = {
      title: 'Shop',
      description: '',
      header: 'default',
      active: '/',
      content: <HomeWrapper gridItems={gridItems} cartItems={cart} />
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
  const params = {
    title: 'Biography',
    description: '',
    header: 'default',
    active: '/biography',
    content: <BiographyWrapper />
  };
  return render(req, resp, next, params);
}

/**
 * Contact page handler
 * @param req
 * @param resp
 * @param next
 * @returns {*}
 */
function contact(req, resp, next) {
  const params = {
    title: 'Contact',
    description: '',
    header: 'colored',
    active: '/contact',
    content: <ContactWrapper />
  };
  return render(req, resp, next, params);
}

export { home, biography, contact };
