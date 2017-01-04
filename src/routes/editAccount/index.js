import React from 'react';
import EditAccount from './EditAccount';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/edit-account',

  async action() {
    const cart = await fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    const user = await fetch('/api/check', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title: 'Edit Account',
      component: <Layout headerClass={'colored'} activeSlug={'/my-account'} cartItems={cart}>
        <EditAccount {...user} />
      </Layout>,
    };
  },
};
