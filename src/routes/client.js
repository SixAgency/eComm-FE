// @TODO - Remove universal router - use React Router

import React from 'react';
import fetch from '../core/fetch';
import Layout from '../components/Layout';
// Pages
import Home from '../pages/home/Home';
import Biography from '../pages/biography/Biography';
import Cart from '../pages/cart/Cart';
import Checkout from '../pages/checkout/Checkout';
import Product from '../pages/product/Product';
import ProductCategory from '../pages/productCategory/ProductCategory';
import Contact from '../pages/contact/Contact';
import NotFound from '../pages/notFound/NotFound';
// My Account
import Account from '../pages/account/Account';
import Dashboard from '../pages/account/Dashboard';
import Edit from '../pages/account/Edit';
import Billing from '../pages/account/Billing';
import Shipping from '../pages/account/Shipping';

const routes = {
  path: '/',
  children: [
    {
      path: '/',
      async action() {
        // TODO - ERROR HANDLING
        const products = await fetch('/api/products', { credentials: 'same-origin' })
          .then((resp) => (resp.json())
            .then((json) => (json.products)));
        return {
          headerClass: 'default',
          activeSlug: '/',
          title: 'Shop',
          content: <Home gridItems={products} />,
        };
      },
    },
    {
      path: '/biography',
      action() {
        return {
          headerClass: 'default',
          activeSlug: '/biography',
          title: 'Biography',
          content: <Biography />,
        };
      },
    },
    {
      path: '/checkout',
      async action() {
        const user = await fetch('/api/check', { credentials: 'same-origin' })
          .then((resp) => (resp.json())
            .then((json) => (json)));
        const cart = await fetch('/api/cart', { credentials: 'same-origin' })
        .then((resp) => (resp.json())
          .then((json) => (json)));
        return {
          headerClass: 'colored',
          activeSlug: '/',
          title: 'Checkout',
          content: <Checkout {...user} cartItems={cart} />,
        };
      },
    },
    {
      path: '/cart',
      async action() {
        const cart = await fetch('/api/cart', { credentials: 'same-origin' })
          .then((resp) => (resp.json())
            .then((json) => (json)));
        return {
          headerClass: 'default',
          activeSlug: '/',
          title: 'Cart',
          content: <Cart cartItems={cart} />,
        };
      },
    },
    {
      path: '/contact',
      action() {
        return {
          headerClass: 'colored',
          activeSlug: '/contact',
          title: 'Contact',
          content: <Contact />,
        };
      },
    },
    {
      path: '/product/:slug',
      async action(context) {
        const slug = context.params.slug;
        // TODO - ERROR HANDLING
        const [product, products] = await Promise.all([
          fetch(`/api/products/${slug}`, { credentials: 'same-origin' })
          .then((resp) => (resp.json())
            .then((json) => (json))),
          fetch('/api/products', { credentials: 'same-origin' })
          .then((resp) => (resp.json())
            .then((json) => (json))),
        ]);
        if (product && products) {
          return {
            headerClass: 'colored',
            activeSlug: '/',
            title: product.name || 'Shop',
            content: <Product product={product} products={products} />,
          };
        }
        return {
          title: 'Shop',
          content: null,
        };
      },
    },
    {
      path: '/product-category',
      async action() {
        // const category = context.params.category;
        // console.log(category);
        // TODO - ERROR HANDLING
        const products = await fetch('/api/products', { credentials: 'same-origin' })
          .then((resp) => (resp.json())
            .then((json) => (json.products)));
        return {
          headerClass: 'default',
          activeSlug: '/',
          title: 'Archives',
          content: <ProductCategory products={products} />,
        };
      },
    },
    {
      path: '/my-account',
      children: [
        {
          path: '/',
          async action() {
            const user = await fetch('/api/check', { credentials: 'same-origin' })
              .then((resp) => (resp.json())
                .then((json) => (json)));
            if (user.logged) {
              return { redirect: '/my-account/dashboard' };
            }
            const clientSide = true;
            return {
              headerClass: 'colored',
              activeSlug: '/my-account',
              title: 'My Account',
              content: <Account {...user} client={clientSide} />,
            };
          },
        },
        {
          path: '/dashboard',
          async action() {
            const user = await fetch('/api/check', { credentials: 'same-origin' })
              .then((resp) => (resp.json())
                .then((json) => (json)));
            if (!user.logged) {
              return { redirect: '/my-account' };
            }
            const data = await fetch('/api/addresses', { credentials: 'same-origin' })
              .then((resp) => (resp.json())
                .then((json) => (json)));
            const addresses = {
              shippAddress: data.ship_address,
              billAddress: data.bill_address,
            };
            const clientSide = true;
            return {
              headerClass: 'colored',
              activeSlug: '/my-account',
              title: 'My Account',
              content: <Dashboard {...user} client={clientSide} addresses={addresses} />,
            };
          },
        },
        {
          path: '/edit-account',
          async action() {
            const user = await fetch('/api/check', { credentials: 'same-origin' })
                  .then((resp) => (resp.json())
                    .then((json) => (json)));
            if (!user.logged) {
              return { redirect: '/my-account' };
            }
            const clientSide = true;
            return {
              headerClass: 'colored',
              activeSlug: '/',
              title: 'Edit Account',
              content: <Edit {...user} client={clientSide} />,
            };
          },
        },
        {
          path: '/edit-address',
          children: [
            {
              path: '/',
              async action() {
                const user = await fetch('/api/check', { credentials: 'same-origin' })
                  .then((resp) => (resp.json())
                    .then((json) => (json)));
                if (!user.logged) {
                  return { redirect: '/my-account' };
                }
                const clientSide = true;
                return {
                  headerClass: 'colored',
                  activeSlug: '/',
                  title: 'My Account',
                  content: <Edit {...user} client={clientSide} />,
                };
              },
            },
            {
              path: '/shipping',
              async action() {
                const user = await fetch('/api/check', { credentials: 'same-origin' })
                  .then((resp) => (resp.json())
                    .then((json) => (json)));
                if (!user.logged) {
                  return { redirect: '/my-account' };
                }
                const clientSide = true;
                const data = await fetch('/api/addresses', { credentials: 'same-origin' })
                  .then((resp) => (resp.json())
                    .then((json) => (json)));
                const address = data.ship_address;
                return {
                  headerClass: 'colored',
                  activeSlug: '/',
                  title: 'Edit Shipping Address',
                  content: <Shipping {...user} client={clientSide} shipping={address} />,
                };
              },
            },
            {
              path: '/billing',
              async action() {
                const user = await fetch('/api/check', { credentials: 'same-origin' })
                  .then((resp) => (resp.json())
                    .then((json) => (json)));
                if (!user.logged) {
                  return { redirect: '/my-account' };
                }
                const clientSide = true;
                const data = await fetch('/api/addresses', { credentials: 'same-origin' })
                  .then((resp) => (resp.json())
                    .then((json) => (json)));
                const address = data.ship_address;
                return {
                  headerClass: 'colored',
                  activeSlug: '/',
                  title: 'Edit Billing Address',
                  content: <Billing {...user} client={clientSide} billing={address} />,
                };
              },
            },
          ],
        },
      ],
    },
    {
      path: '*',
      action() {
        const title = 'Page Not Found';
        return {
          headerClass: 'default',
          activeSlug: '/',
          title,
          content: <NotFound title={title} />,
          status: 404,
        };
      },
    },
  ],
  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();
    const cart = await fetch('/api/cart', { credentials: 'same-origin' })
      .then((resp) => (resp.json())
        .then((json) => (json)));
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - krissorbie`;
    route.description = route.description || '';
    route.component = (
      <Layout headerClass={route.headerClass} activeSlug={route.activeSlug} cartItems={cart}>
        {route.content}
      </Layout>
    );
    return route;
  },
};

export default routes;