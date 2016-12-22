/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import fetch from '../../core/fetch';
import NotFound from './NotFound';

const title = 'Page Not Found';

export default {

  path: '*',

  // action() {
  //   return {
  //     title,
  //     component: <Layout headerClass={'default'} activeSlug={'/'} cartItems={cart}><NotFound title={title} cartItems={cart} /></Layout>,
  //     status: 404,
  //   };
  // },
  async action() {
    const cart = await fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    return {
      title,
      component: <Layout headerClass={'default'} activeSlug={'/'} cartItems={cart}><NotFound title={title} cartItems={cart} /></Layout>,
      status: 404,
    };
  },

};
