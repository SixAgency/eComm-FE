import React from 'react';
import Biography from './Biography';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/biography',

  async action() {
    const cart = await fetch('/api/cart')
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title: 'React Starter Kit',
      component: <Layout headerClass={'default'} activeSlug={'/biography'} cartItems={cart}><Biography /></Layout>,
    };
  },

};
