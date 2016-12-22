import React from 'react';
import Product from './Product';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/product/:slug',

  async action() {
    // TODO - ERROR HANDLING
    const cart = await fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    // TODO - ERROR HANDLING
    const product = await fetch('/api/products', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json.products[0])));
    return {
      title: product.name || 'Shop',
      component: <Layout headerClass={'colored'} activeSlug={'/'} cartItems={cart}><Product product={product} /></Layout>,
    };
  },

};
