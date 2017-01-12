import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import assets from './assets'; // eslint-disable-line import/no-unresolved

import conslog from '../utils/dev';

// Actions
import getProducts from '../api/products';
import { checkLogin } from '../api/users';
import { getCart } from '../api/orders';
import { getAddresses } from '../api/addresses';

// Top Level Compontents
import Layout from '../components/Layout';
import App from '../components/App';
import Html from '../components/Html';

// Pages
import HomeWrapper from '../pages/Home';
import BiographyWrapper from '../pages/Biography';
import CartWrapper from '../pages/Cart';
import CheckoutWrapper from '../pages/Checkout';
import ProductWrapper from '../pages/Product';
import CategoryWrapper from '../pages/Category';
import ContactWrapper from '../pages/Contact';
import NotFoundWrapper from '../pages/NotFound';
// My Account
import AccountWrapper from '../pages/Account/Account';
import DashboardWrapper from '../pages/Account/Dashboard';
import ProfileWrapper from '../pages/Account/Profile';
import BillingWrapper from '../pages/Account/Billing';
import ShippingWrapper from '../pages/Account/Shipping';

const siteRoutes = express.Router();

// Router Wrapper function
function handleRoutes(req, resp, next, params) {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
    };

    const data = { ...params };
    // Cart will be loaded async
    const cart = { isLoaded: false, isEmpty: true, cart: {} };
    const headerProps = {
      headerClass: data.header,
      activeSlug: data.active,
    }
    data.component = (
      <Layout headerProps={headerProps} cartItems={cart}>
        {data.content}
      </Layout>
    );
    data.children = ReactDOM.renderToString(<App context={context}>{data.component}</App>);
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    if (assets[params.chunk]) {
      data.scripts.push(assets[params.chunk].js);
    }

    const html = ReactDOM.renderToString(<Html {...data} />);
    resp.status(params.status || 200);
    resp.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
}

// Homepage
siteRoutes.get('/', (req, resp, next) => {
  getProducts(req).then((data) => {
    const gridItems = {
      isLoaded: true,
      products: data.products,
    }
    const params = {
      title: 'Shop',
      description: '',
      header: 'default',
      active: '/',
      content: <HomeWrapper gridItems={gridItems} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Biography Page
siteRoutes.get('/biography', (req, resp, next) => {
  const params = {
    title: 'Biography',
    description: '',
    header: 'default',
    active: '/biography',
    content: <BiographyWrapper />,
  };
  handleRoutes(req, resp, next, params);
});
// Product Details Page
siteRoutes.get('/product/:slug', (req, resp, next) => {
  getProducts(req).then((data) => {
    const params = {
      title: data.name || 'Shop',
      description: '',
      header: 'colored',
      active: '/',
      content: <ProductWrapper product={data} products={Array(data)} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Category Page
siteRoutes.get('/product-category/:slug', (req, resp, next) => {
  const params = {};
  handleRoutes(req, resp, next, params);
});
// Account - Login/Register
siteRoutes.get('/my-account', (req, resp, next) => {
  const user = checkLogin(req);
  if (user.logged) {
    resp.redirect('/my-account/dashboard');
  }
  const params = {
    title: 'My Account',
    description: '',
    header: 'colored',
    active: '/my-account',
    content: <AccountWrapper {...user} />,
  };
  handleRoutes(req, resp, next, params);
});
// Account Lost Password - @TODO
siteRoutes.get('/my-account/lost-password', (req, resp, next) => {
  const user = checkLogin(req);
  if (user.logged) {
    resp.redirect('/my-account/dashboard');
  }
  const params = {
    title: 'My Account',
    description: '',
    header: 'colored',
    active: '/my-account',
    content: <PasswordWrapper {...user} />,
  };
  handleRoutes(req, resp, next, params);
});
// Account Dashboard
siteRoutes.get('/my-account/dashboard', (req, resp, next) => {
  const user = checkLogin(req);
  if (!user.logged) {
    resp.redirect('/my-account');
  }
  getAddresses(req).then((data) => {
    const addresses = {
      shippAddress: data.ship_address,
      billAddress: data.bill_address,
    };
    const params = {
      title: 'My Account',
      description: '',
      header: 'colored',
      active: '/my-account',
      content: <DashboardWrapper {...user} addresses={addresses} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Account - Edit
siteRoutes.get('/my-account/edit-account', (req, resp, next) => {
  const user = checkLogin(req);
  if (!user.logged) {
    resp.redirect('/my-account');
  }
  const params = {
    title: 'Edit Account',
    description: '',
    header: 'colored',
    active: '/my-account',
    content: <ProfileWrapper {...user} />,
  };
  handleRoutes(req, resp, next, params);
});
// Account - Addresses
siteRoutes.get('/my-account/edit-address', (req, resp, next) => {
  const user = checkLogin(req);
  if (!user.logged) {
    resp.redirect('/my-account');
  }
  const params = {
    title: 'Edit Account',
    description: '',
    header: 'colored',
    active: '/my-account',
    content: <ProfileWrapper {...user} />,
  };
  handleRoutes(req, resp, next, params);
});
// Account - Shipping
siteRoutes.get('/my-account/edit-address/shipping', (req, resp, next) => {
  const user = checkLogin(req);
  if (!user.logged) {
    resp.redirect('/my-account');
  }
  getAddresses(req).then((data) => {
    const address = data.ship_address;
    const params = {
      title: 'Edit Shipping Address',
      description: '',
      header: 'colored',
      active: '/my-account',
      content: <ShippingWrapper {...user} address={address} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Account - Billing
siteRoutes.get('/my-account/edit-address/billing', (req, resp, next) => {
  const user = checkLogin(req);
  if (!user.logged) {
    resp.redirect('/my-account');
  }
  getAddresses(req).then((data) => {
    const address = data.ship_address;
    const params = {
      title: 'Edit Billing Address',
      description: '',
      header: 'colored',
      active: '/my-account',
      content: <BillingWrapper {...user} address={address} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Cart Page
siteRoutes.get('/cart', (req, resp, next) => {
  Promise.all([
    checkLogin(req).then(user => user.loggedIn),
    getCart(req).then(cart => cart),
  ])
    .then((values) => {
      const loggedIn = values[0];
      const cart = values[1];
      const params = {
        title: 'Cart',
        description: '',
        header: 'default',
        active: '/',
        content: <CartWrapper cartItems={cart} loggedIn={loggedIn} />,
      };
      handleRoutes(req, resp, next, params);
    })
    .catch(err => conslog(err));
});
// Checkout Page
siteRoutes.get('/checkout', (req, resp, next) => {
  getCart(req).then((data) => {
    const params = {
      title: 'Checkout',
      description: '',
      header: 'default',
      active: '/',
      content: <CheckoutWrapper cartItems={data} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Contact Page
siteRoutes.get('/contact', (req, resp, next) => {
  const params = {
    title: 'Contact',
    description: '',
    header: 'colored',
    active: '/contact',
    content: <ContactWrapper />,
  };
  handleRoutes(req, resp, next, params);
});

export default siteRoutes;
