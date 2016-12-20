import React from 'react';
import Cart from './Cart';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/carts',

  async action() {
    const cart = await fetch('/api/cart')
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title: 'React Starter Kit',
      component: <Layout headerClass={'colored'} activeSlug={'/shop'} cartItems={cart}><Cart /></Layout>,
    };
  },

};
