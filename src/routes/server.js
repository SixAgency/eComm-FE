import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import capitalize from 'lodash.capitalize';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved

import conslog from '../utils/dev';
import { BREADCRUMBS } from '../constants/AppConsts';

// Actions
import { getProducts, getProduct } from '../api/products';
import { checkLogin } from '../api/users';
import { getCart, getOrder, getOrders } from '../api/orders';
import { getAddresses } from '../api/addresses';
import { getCheckoutBilling, getCheckoutShipping } from '../api/helpers/feed';

// Top Level Compontents
import Layout from '../components/Layout';
import App from '../components/App';
import Html from '../components/Html';

// Pages
import HomeWrapper from '../pages/Home';
import BiographyWrapper from '../pages/Biography';
import CartWrapper from '../pages/Cart';
import ProductWrapper from '../pages/Product';
import CategoryWrapper from '../pages/Category';
import ContactWrapper from '../pages/Contact';
import MannequinHeadsWrapper from '../pages/MannequinHeads';
import NotFoundWrapper from '../pages/NotFound';
import ErrorPageWrapper from '../pages/Error';
// My Account
import AccountWrapper from '../pages/Account/Account';
import DashboardWrapper from '../pages/Account/Dashboard';
import ProfileWrapper from '../pages/Account/Profile';
import PasswordWrapper from '../pages/Account/Profile/Password';
import BillingWrapper from '../pages/Account/Billing';
import ShippingWrapper from '../pages/Account/Shipping';
import LostPasswordWrapper from '../pages/Account/LostPassword';
import ViewOrderWrapper from '../pages/Account/ViewOrder';
import CreateAddress from '../pages/Account/Address/Create';
import EditAddressesWrapper from '../pages/Account/EditAddresses';
// Checkout
import BillingCheckout from '../pages/Checkout/Billing';
import ShippingCheckout from '../pages/Checkout/Shipping';
import PromoCheckout from '../pages/Checkout/Promo';
import ReviewCheckout from '../pages/Checkout/Review';

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
      }
    };

    const data = { ...params };
    // Cart will be loaded async
    const cart = { isLoaded: false, isEmpty: true, cart: {} };
    const headerProps = {
      headerClass: data.header,
      activeSlug: data.active
    };
    data.component = (
      <Layout headerProps={headerProps} cartItems={cart}>
        {data.content}
      </Layout>
    );
    data.children = ReactDOM.renderToString(<App context={context}>{data.component}</App>);
    data.style = [...css].join('');
    data.scripts = [
      assets.vendor.js,
      assets.client.js
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

// Handle Error
function handleError(data, resp, callback) {
  if (data.isError) {
    conslog('error', data.messages);
    resp.redirect('/error');
  } else {
    callback();
  }
}

// Homepage
siteRoutes.get('/', (req, resp, next) => {
  getProducts(req)
    .then((data) => handleError(data, resp, () => {
      const gridItems = {
        isLoaded: true,
        ...data
      };
      const params = {
        title: 'Shop',
        description: '',
        header: 'default',
        active: '/',
        content: <HomeWrapper gridItems={gridItems} />
      };
      handleRoutes(req, resp, next, params);
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Biography Page
siteRoutes.get('/biography', (req, resp, next) => {
  const params = {
    title: 'Biography',
    description: '',
    header: 'default',
    active: '/biography',
    content: <BiographyWrapper />
  };
  handleRoutes(req, resp, next, params);
});
// Product Details Page
siteRoutes.get('/product/:slug', (req, resp, next) => {
  getProduct(req)
    .then((data) => handleError(data, resp, () => {
      if (data.isEmpty) {
        conslog('NOT FOUND', data);
        resp.redirect('/404');
      } else {
        const product = {
          isLoaded: true,
          ...data
        };
        const prodParams = {
          slug: req.params.slug
        };
        const { images } = product.product.master;
        let ogImage = '';
        if (images.length > 0 && images[0].large_url) {
          ogImage = `https:${images[0].large_url}`;
        }
        const params = {
          title: product.product.name || 'Shop',
          description: product.product.description || '',
          ogImage,
          header: 'colored',
          active: '/',
          content: <ProductWrapper product={product} params={prodParams} />
        };
        handleRoutes(req, resp, next, params);
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Category Page
siteRoutes.get('/product-category/:slug', (req, resp, next) => {
  getProducts(req)
    .then((data) => handleError(data, resp, () => {
      const products = {
        isLoaded: true,
        ...data
      };
      const prodParams = {
        slug: req.params.slug
      };
      const params = {
        title: `${capitalize(prodParams.slug)} Archives`,
        description: '',
        header: 'default',
        active: '/',
        content: <CategoryWrapper gridItems={products} params={prodParams} />
      };
      handleRoutes(req, resp, next, params);
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/404');
    });
});
// Account - Login/Register
siteRoutes.get('/my-account', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (data.user.loggedIn) {
        resp.redirect('/my-account/dashboard');
      } else {
        const messages = data.messages || [];
        const params = {
          title: 'My Account',
          description: '',
          header: 'colored',
          active: '/my-account',
          content: <AccountWrapper
            {...data.user}
            isError={data.isError}
            messages={messages}
            breadcrumbs={BREADCRUMBS.dashboard}
          />
        };
        handleRoutes(req, resp, next, params);
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account - Lost Password
siteRoutes.get('/my-account/lost-password', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (data.user.loggedIn) {
        resp.redirect('/my-account/dashboard');
      } else {
        const params = {
          title: 'My Account',
          description: '',
          header: 'colored',
          active: '/my-account',
          content: <LostPasswordWrapper {...data.user} />
        };
        handleRoutes(req, resp, next, params);
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/500');
    });
});
// Account - View/Order
siteRoutes.get('/my-account/view-order/:number', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (data.user.loggedIn) {
        getOrder(req)
          .then((orderData) => handleError(orderData, resp, () => {
            if (orderData.isEmpty) {
              conslog('NOT FOUND', orderData);
              resp.redirect('/404');
            } else {
              const order = {
                isLoaded: true,
                ...orderData
              };
              const params = {
                title: 'My Account',
                description: '',
                header: 'colored',
                active: '/my-account',
                content: <ViewOrderWrapper order={order} loggedIn={data.user.loggedIn} />
              };
              handleRoutes(req, resp, next, params);
            }
          }))
          .catch((err) => {
            conslog('ERROR', err);
            resp.redirect('/error');
          });
      } else {
        resp.redirect('/my-account');
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account Dashboard
siteRoutes.get('/my-account/dashboard', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        let addresses = {
          shipping: {
            isLoaded: true,
            isEmpty: true,
            address: {}
          },
          billing: {
            isLoaded: true,
            isEmpty: true,
            address: {}
          }
        };
        const params = {
          title: 'My Account',
          description: '',
          header: 'colored',
          active: '/my-account'
        };
        return Promise.all([
          getAddresses(req, { isNew: false }),
          getOrders(req)
        ]).then((values) => {
          const address = values[0];
          const orders = values[1];
          addresses = {
            shipping: {
              isLoaded: true,
              isEmpty: address.ship_address == null,
              address: address.ship_address || {}
            },
            billing: {
              isLoaded: true,
              isEmpty: address.bill_address == null,
              address: address.bill_address || {}
            }
          };
          params.content = (<DashboardWrapper
            {...data.user}
            {...addresses}
            orders={orders}
            breadcrumbs={BREADCRUMBS.dashboard}
          />);
          handleRoutes(req, resp, next, params);
        }).catch((err) => {
          conslog('ERROR', err);
          params.content = (
            <DashboardWrapper
              {...data.user}
              {...addresses}
              breadcrumbs={BREADCRUMBS.dashboard}
            />);
          handleRoutes(req, resp, next, params);
        });
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account - Edit
siteRoutes.get('/my-account/edit-account', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        const params = {
          title: 'Edit Account',
          description: '',
          header: 'colored',
          active: '/my-account',
          content: <ProfileWrapper {...data.user} breadcrumbs={BREADCRUMBS.editAccount} />
        };
        handleRoutes(req, resp, next, params);
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
siteRoutes.get('/my-account/edit-password', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        const params = {
          title: 'Edit Account',
          description: '',
          header: 'colored',
          active: '/my-account',
          content: <PasswordWrapper {...data.user} />
        };
        handleRoutes(req, resp, next, params);
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account - Shipping
siteRoutes.get('/my-account/address/create/:type', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        const params = {
          title: 'Create Address',
          description: '',
          header: 'colored',
          active: '/my-account',
          content: <CreateAddress {...data.user} params={req.params} />
        };
        handleRoutes(req, resp, next, params);
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account - Addresses view
siteRoutes.get('/my-account/address/manage', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        getAddresses(req, { isNew: false })
        .then((addresses) => handleError(data, resp, () => {
          const params = {
            title: 'Manage Addresses',
            description: '',
            active: '/my-account',
            content: <EditAddressesWrapper
              {...data.user}
              params={req.params}
              addresses={{ ...addresses.addresses }}
              billing={{ ...addresses.billing }}
              shipping={{ ...addresses.shipping }}
            />
          };
          handleRoutes(req, resp, next, params);
        }))
        .catch((err) => {
          conslog('ERROR', err);
          resp.redirect('/error');
        });
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account - Shipping
siteRoutes.get('/my-account/address/shipping', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        let address = {
          isLoaded: true,
          isEmpty: true,
          address: {}
        };
        let alladdresses = {
          isLoaded: true,
          isEmpty: true,
          addresses: []
        };
        const params = {
          title: 'Edit Shipping Address',
          description: '',
          header: 'colored',
          active: '/my-account'
        };
        getAddresses(req, { isNew: false })
          .then((addresses) => {
            address = { ...addresses.billing, isLoaded: true };
            alladdresses = { ...addresses.addresses, isLoaded: true };
            params.content = (<ShippingWrapper
              {...data.user}
              shipping={address}
              addresses={alladdresses}
              breadcrumbs={BREADCRUMBS.addresses}
            />);
            handleRoutes(req, resp, next, params);
          }).catch((err) => {
            conslog('ERROR', err);
            params.content = <ShippingWrapper {...data.user} shipping={address} />;
            handleRoutes(req, resp, next, params);
          });
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Account - Billing
siteRoutes.get('/my-account/address/billing', (req, resp, next) => {
  checkLogin(req)
    .then((data) => handleError(data, resp, () => {
      if (!data.user.loggedIn) {
        resp.redirect('/my-account');
      } else {
        let address = {
          isLoaded: true,
          isEmpty: true,
          address: {}
        };
        let alladdresses = {
          isLoaded: true,
          isEmpty: true,
          address: []
        };
        const params = {
          title: 'Edit Billing Address',
          description: '',
          header: 'colored',
          active: '/my-account'
        };
        getAddresses(req, { isNew: false })
          .then((addresses) => {
            conslog('addd', addresses);
            const messages = data.messages || [];
            address = { ...addresses.billing, isLoaded: true };
            alladdresses = { ...addresses.addresses, isLoaded: true };
            params.content = (<BillingWrapper
              {...data.user}
              billing={address}
              addresses={alladdresses}
              isError={data.isError}
              messages={messages}
              breadcrumbs={BREADCRUMBS.addresses}
            />);
            handleRoutes(req, resp, next, params);
          })
          .catch((err) => {
            conslog('ERROR', err);
            params.content = (
              <BillingWrapper
                {...data.user}
                billing={address}
                addresses={alladdresses}
              />
            );
            handleRoutes(req, resp, next, params);
          });
      }
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Cart Page
siteRoutes.get('/cart', (req, resp, next) => {
  checkLogin(req)
    .then((user) => handleError(user, resp, () => {
      getCart(req)
        .then((cart) => handleError(cart, resp, () => {
          const params = {
            title: 'Cart',
            description: '',
            header: 'default',
            active: '/',
            content: <CartWrapper
              cartItems={cart}
              loggedIn={user.user.loggedIn}
              breadcrumbs={BREADCRUMBS.cart}
            />
          };
          handleRoutes(req, resp, next, params);
        }))
        .catch((err) => {
          conslog('ERROR', err);
          resp.redirect('/error');
        });
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Checkout Pages
siteRoutes.get('/checkout/billing', (req, resp, next) => {
  checkLogin(req)
    .then((user) => handleError(user, resp, () => {
      getCart(req)
        .then((cart) => handleError(cart, resp, () => {
          getAddresses(req, { isNew: false })
            .then((addresses) => handleError(addresses, resp, () => {
              const address = getCheckoutBilling(cart, addresses);
              const params = {
                title: 'checkout',
                description: '',
                header: 'default',
                active: '/',
                content: <BillingCheckout
                  cartState={cart.cart.state}
                  cartItems={cart}
                  loggedIn={user.user.loggedIn}
                  selectedAddress={address}
                  addresses={addresses.addresses}
                  breadcrumbs={BREADCRUMBS.checkout}
                />
              };
              handleRoutes(req, resp, next, params);
            }))
            .catch((err) => {
              conslog('ERROR', err);
              resp.redirect('/error');
            });
        }))
        .catch((err) => {
          conslog('ERROR', err);
          resp.redirect('/error');
        });
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
siteRoutes.get('/checkout/shipping', (req, resp, next) => {
  checkLogin(req)
    .then((user) => handleError(user, resp, () => {
      getCart(req)
        .then((cart) => handleError(cart, resp, () => {
          getAddresses(req, { isNew: false })
            .then((addresses) => handleError(addresses, resp, () => {
              const address = getCheckoutShipping(cart, addresses);
              const params = {
                title: 'checkout',
                description: '',
                header: 'default',
                active: '/',
                content: <ShippingCheckout
                  cartState={cart.cart.state}
                  cartItems={cart}
                  loggedIn={user.user.loggedIn}
                  breadcrumbs={BREADCRUMBS.checkout}
                  selectedAddress={address}
                  addresses={addresses.addresses}
                />
              };
              handleRoutes(req, resp, next, params);
            }))
            .catch((err) => {
              conslog('ERROR', err);
              resp.redirect('/error');
            });
        }))
        .catch((err) => {
          conslog('ERROR', err);
          resp.redirect('/error');
        });
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
siteRoutes.get('/checkout/promo', (req, resp, next) => {
  checkLogin(req)
    .then((user) => handleError(user, resp, () => {
      getCart(req)
        .then((cart) => handleError(cart, resp, () => {
          if (typeof cart.line_items === 'undefined') {
            resp.redirect('/cart');
          } else {
            const params = {
              title: 'Checkout',
              description: '',
              header: 'default',
              active: '/',
              content: <PromoCheckout cartItems={cart} loggedIn={user.user.loggedIn} />
            };
            handleRoutes(req, resp, next, params);
          }
        }))
        .catch((err) => {
          conslog('ERROR', err);
          resp.redirect('/error');
        });
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
siteRoutes.get('/checkout/review', (req, resp, next) => {
  checkLogin(req)
    .then((user) => handleError(user, resp, () => {
      getCart(req)
        .then((cart) => handleError(cart, resp, () => {
          if (typeof cart.line_items === 'undefined') {
            resp.redirect('/cart');
          } else {
            const params = {
              title: 'Checkout',
              description: '',
              header: 'default',
              active: '/',
              content: <ReviewCheckout cartItems={cart} loggedIn={user.user.loggedIn} />
            };
            handleRoutes(req, resp, next, params);
          }
        }))
        .catch((err) => {
          conslog('ERROR', err);
          resp.redirect('/error');
        });
    }))
    .catch((err) => {
      conslog('ERROR', err);
      resp.redirect('/error');
    });
});
// Contact Page
siteRoutes.get('/contact', (req, resp, next) => {
  const params = {
    title: 'Contact',
    description: '',
    header: 'colored',
    active: '/contact',
    content: <ContactWrapper />
  };
  handleRoutes(req, resp, next, params);
});

// ks Mannequin Heads Page
siteRoutes.get('/ks-mannequin-heads', (req, resp, next) => {
  const params = {
    title: 'ks Mannequin Heads',
    description: '',
    header: 'default',
    active: '/shop',
    content: <MannequinHeadsWrapper />
  };
  handleRoutes(req, resp, next, params);
});

// Error Page
siteRoutes.get('/error', (req, resp, next) => {
  const params = {
    title: 'Error',
    description: '',
    header: 'default',
    active: '/',
    content: <ErrorPageWrapper />
  };
  handleRoutes(req, resp, next, params);
});

// 404 Page
siteRoutes.get('*', (req, resp, next) => {
  const params = {
    title: 'Page Not Found',
    description: '',
    header: 'default',
    active: '/',
    status: '404',
    content: <NotFoundWrapper />
  };
  handleRoutes(req, resp, next, params);
});

export default siteRoutes;
