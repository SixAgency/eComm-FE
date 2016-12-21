import React from 'react';
import Cart from './Cart';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/cart',

  async action() {
    const cart = await fetch('/api/cart')
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title: 'Cart',
      component: <Layout headerClass={'default'} activeSlug={'/'} cartItems={cart}><Cart cartItems={cart} /></Layout>,
    };
  },

};
