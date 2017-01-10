import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import assets from './assets'; // eslint-disable-line import/no-unresolved

// Actions
import getProducts from '../api/products';
import { checkLogin } from '../api/users';
import { getCart } from '../api/orders';

// Top Level Compontents
import Layout from '../components/Layout';
import App from '../components/App';
import Html from '../components/Html';

// Pages
import Home from '../pages/home/Home';
import Product from '../pages/product/Product';
import Biography from '../pages/biography/Biography';
import Contact from '../pages/contact/Contact';
import Account from '../pages/account/Account';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';

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
    const cart = { isLoaded: false };
    data.component = (
      <Layout headerClass={data.header} activeSlug={data.active} cartItems={cart}>
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
    const params = {
      title: 'Shop',
      description: '',
      header: 'default',
      active: '/',
      content: <Home gridItems={data.products} />,
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
    content: <Biography />,
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
      content: <Product product={data} products={Array(data)} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Category Page
siteRoutes.get('/product-category/:slug', (req, resp, next) => {
  const params = {};
  handleRoutes(req, resp, next, params);
});
// Account Dashboard
siteRoutes.get('/my-account', (req, resp, next) => {
  const user = checkLogin(req);
  const params = {
    title: 'My Account',
    description: '',
    header: 'colored',
    active: '/my-account',
    content: <Account {...user} />,
  };
  handleRoutes(req, resp, next, params);
});
// Account Login
siteRoutes.get('/my-account/login', (req, resp, next) => {
  const params = {};
  handleRoutes(req, resp, next, params);
});
// Account Register
siteRoutes.get('/my-account/register', (req, resp, next) => {
  const params = {};
  handleRoutes(req, resp, next, params);
});
// Account Register
siteRoutes.get('/my-account/lost-password', (req, resp, next) => {
  const params = {};
  handleRoutes(req, resp, next, params);
});
// Cart Page
siteRoutes.get('/cart', (req, resp, next) => {
  getCart(req).then((data) => {
    const params = {
      title: 'Cart',
      description: '',
      header: 'default',
      active: '/',
      content: <Cart cartItems={data} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Checkout Page
siteRoutes.get('/checkout', (req, resp, next) => {
  getCart(req).then((data) => {
    const params = {
      title: 'Checkout',
      description: '',
      header: 'default',
      active: '/',
      content: <Checkout cartItems={data} />,
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
    content: <Contact />,
  };
  handleRoutes(req, resp, next, params);
});

export default siteRoutes;
