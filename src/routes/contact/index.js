import React from 'react';
import Contact from './Contact';
import fetch from '../../core/fetch';
import Layout from '../../components/Layout';

export default {

  path: '/contact',

  async action() {
    return {
      title: 'React Starter Kit',
      component: <Layout><Contact /></Layout>,
    };
  },

};
