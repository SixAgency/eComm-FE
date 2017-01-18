import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import assets from './assets'; // eslint-disable-line import/no-unresolved

import conslog from '../utils/dev';

// Actions
import { getProducts, getProduct } from '../api/products';
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
import LostPasswordWrapper from '../pages/Account/LostPassword';
// import ViewOrderWrapper from '../pages/Account/ViewOrder';

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
  getProduct(req)
    .then((data) => {
      const product = {
        isLoaded: true,
        product: data,
      };
      const prodParams = {
        slug: req.params.slug,
      }
      const params = {
        title: product.name || 'Shop',
        description: '',
        header: 'colored',
        active: '/',
        content: <ProductWrapper product={product} params={prodParams} />,
      };
      handleRoutes(req, resp, next, params);
    })
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/404');
    });
});
// Category Page
siteRoutes.get('/product-category/:slug', (req, resp, next) => {
  const params = {};
  handleRoutes(req, resp, next, params);
});
// Account - Login/Register
siteRoutes.get('/my-account', (req, resp, next) => {
  checkLogin(req).then((data) => {
    if (data.loggedIn) {
      resp.redirect('/my-account/dashboard');
    }
    const params = {
      title: 'My Account',
      description: '',
      header: 'colored',
      active: '/my-account',
      content: <AccountWrapper {...data} />,
    };
    handleRoutes(req, resp, next, params);
  });
});
// Account - Lost Password
siteRoutes.get('/my-account/lost-password', (req, resp, next) => {
  checkLogin(req).then((data) => {
    if (data.loggedIn) {
      resp.redirect('/my-account/dashboard');
    } else {
      const params = {
        title: 'My Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <LostPasswordWrapper {...data} />,
      };
      handleRoutes(req, resp, next, params);
    }
  });
});
// Account - View/Order - @TODO, page, endpoint etc
siteRoutes.get('/my-account/view-order', (req, resp) => {
  checkLogin(req).then((data) => {
    if (data.loggedIn) {
      resp.redirect('/my-account/dashboard');
    } else {
      resp.redirect('/my-account');
      // const params = {
      //   title: 'My Account',
      //   description: '',
      //   header: 'colored',
      //   active: '/my-account',
      //   content: <ViewOrderWrapper {...data} />,
      // };
      // handleRoutes(req, resp, next, params);
    }
  });
});
// Account Dashboard
siteRoutes.get('/my-account/dashboard', (req, resp, next) => {
  checkLogin(req)
    .then((user) => {
      if (!user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        let addresses = {
          shipping: {
            isLoaded: true,
            isEmpty: true,
            address: {},
          },
          billing: {
            isLoaded: true,
            isEmpty: true,
            address: {},
          },
        };
        const params = {
          title: 'My Account',
          description: '',
          header: 'colored',
          active: '/my-account',
        };
        getAddresses(req)
          .then((address) => {
            addresses = {
              shipping: {
                isLoaded: true,
                isEmpty: address.ship_address == null,
                address: address.ship_address || {},
              },
              billing: {
                isLoaded: true,
                isEmpty: address.bill_address == null,
                address: address.bill_address || {},
              },
            };
            params.content = <DashboardWrapper {...user} {...addresses} />;
            handleRoutes(req, resp, next, params);
          }).catch((err) => {
            conslog('ERROR', err);
            params.content = <DashboardWrapper {...user} {...addresses} />;
            handleRoutes(req, resp, next, params);
          });
      }
    }).catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/my-account');
    });
});
// Account - Edit
siteRoutes.get('/my-account/edit-account', (req, resp, next) => {
  checkLogin(req).then((data) => {
    if (!data.loggedIn) {
      resp.redirect('/my-account');
    } else {
      const params = {
        title: 'Edit Account',
        description: '',
        header: 'colored',
        active: '/my-account',
        content: <ProfileWrapper {...data} />,
      };
      handleRoutes(req, resp, next, params);
    }
  });
});
// Account - Shipping
siteRoutes.get('/my-account/edit-address/shipping', (req, resp, next) => {
  checkLogin(req)
    .then((user) => {
      if (!user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        let address = {
          isLoaded: true,
          isEmpty: true,
          address: {},
        };
        const params = {
          title: 'Edit Shipping Address',
          description: '',
          header: 'colored',
          active: '/my-account',
        };
        getAddresses(req)
          .then((data) => {
            address = {
              isLoaded: true,
              isEmpty: data.ship_address === null,
              address: data.ship_address || {},
            }
            params.content = <ShippingWrapper {...user} shipping={address} />;
            handleRoutes(req, resp, next, params);
          }).catch((err) => {
            conslog('ERROR', err);
            params.content = <ShippingWrapper {...user} shipping={address} />;
            handleRoutes(req, resp, next, params);
          });
      }
    }).catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/my-account');
    });
});
// Account - Billing
siteRoutes.get('/my-account/edit-address/billing', (req, resp, next) => {
  checkLogin(req)
    .then((user) => {
      if (!user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        let address = {
          isLoaded: true,
          isEmpty: true,
          address: {},
        };
        const params = {
          title: 'Edit Billing Address',
          description: '',
          header: 'colored',
          active: '/my-account',
        };
        getAddresses(req)
          .then((data) => {
            address = {
              isLoaded: true,
              isEmpty: data.bill_address === null,
              address: data.bill_address || {},
            }
            params.content = <BillingWrapper {...user} billing={address} />;
            handleRoutes(req, resp, next, params);
          }).catch((err) => {
            conslog('ERROR', err);
            params.content = <BillingWrapper {...user} billing={address} />;
            handleRoutes(req, resp, next, params);
          });
      }
    }).catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/my-account');
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
    .catch(err => conslog('ERROR', err));
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
