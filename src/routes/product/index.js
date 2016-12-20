import React from 'react';
import Product from './Product';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/product/:slug',

  async action() {
    // TODO - ERROR HANDLING
    const cart = await fetch('/api/cart')
      .then((resp) => (resp.json())
        .then((json) => (json)));
    // TODO - ERROR HANDLING
    const product = await fetch('/api/products')
      .then((resp) => (resp.json())
        .then((json) => (json.products[0])));
    return {
      title: 'React Starter Kit',
      component: <Layout headerClass={'colored'} activeSlug={'/'} cartItems={cart}><Product product={product} /></Layout>,
    };
  },

};
