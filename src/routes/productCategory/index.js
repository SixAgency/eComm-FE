import React from 'react';
import ProductCategory from './ProductCategory';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {
  path: '/product-category/',
  async action() {
    // TODO - ERROR HANDLING
    const [cart, products] = await Promise.all([
      fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json))),
      fetch('/api/products', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json))),
    ]);
    return {
      title: 'Archives',
      component: <Layout headerClass={'default'} activeSlug={'/'} cartItems={cart} >
        <ProductCategory cartItems={cart} products={products} />
      </Layout>,
    };
  },
};
