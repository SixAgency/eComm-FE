import React from 'react';
import Cart from './Cart';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/carts',

  async action() {
    return {
      title: 'React Starter Kit',
      component: <Layout><Cart /></Layout>,
    };
  },

};
