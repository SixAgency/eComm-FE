import React from 'react';
import Biography from './Biography';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/biography',

  async action() {
    return {
      title: 'React Starter Kit',
      component: <Layout><Biography /></Layout>,
    };
  },

};
