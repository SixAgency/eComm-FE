import React from 'react';
import Product from './Product';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/product/:slug',

  async action(context) {
    const slug = context.params.slug;
    // TODO - ERROR HANDLING
    const [cart, product] = await Promise.all([
      fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json))),
      fetch(`/api/products/${slug}`, { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json))),
    ]);
    if (cart && product) {
      return {
        title: product.name || 'Shop',
        component: <Layout headerClass={'colored'} activeSlug={'/'} cartItems={cart}><Product product={product} /></Layout>,
      };
    }
    return {
      title: 'Shop',
      component: null,
    };
  },

};
