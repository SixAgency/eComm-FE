import React from 'react';
import Contact from './Contact';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/contact',

  async action() {
    const cart = await fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title: 'Contact',
      component: <Layout headerClass={'colored'} activeSlug={'/contact'} cartItems={cart}><Contact /></Layout>,
    };
  },

};
