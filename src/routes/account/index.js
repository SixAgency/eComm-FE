import React from 'react';
import Account from './Account';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/my-account',

  async action() {
    const cart = await fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    const user = await fetch('/api/check', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title: 'My Account',
      component: <Layout headerClass={'colored'} activeSlug={'/my-account'} cartItems={cart}>
        <Account {...user} />
      </Layout>,
    };
  },

};
