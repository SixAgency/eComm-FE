import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action() {
    // TODO - ERROR HANDLING
    const cart = await fetch('/api/cart')
      .then((resp) => (resp.json())
        .then((json) => (json)));
    // TODO - ERROR HANDLING
    const products = await fetch('/api/products')
      .then((resp) => (resp.json())
        .then((json) => (json.products)));
    return {
      title: 'React Starter Kit',
      component: <Layout headerClass={'default'} activeSlug={'/'} cartItems={cart}><Home gridItems={products} /></Layout>,
    };
  },

};
