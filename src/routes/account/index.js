import React from 'react';
import Account from './Account';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/my-account',

  async action() {
    return {
      title: 'React Starter Kit',
      component: <Layout headerClass={'colored'} activeSlug={'/my-account'}><Account /></Layout>,
    };
  },

};
