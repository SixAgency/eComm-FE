import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
// Pages
import HomeWrapper from '../pages/home';
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

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeWrapper} />
    <Route path="biography" component={Biography} />
    <Route path="my-account" component={Account}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="edit-account" component={Edit}>
        <Route path="billing" component={Billing} />
        <Route path="shipping" component={Shipping} />
      </Route>
    </Route>
    <Route path="product/:slug" component={Product} />
    <Route path="product-category/:slug" component={ProductCategory} />
    <Route path="contact" component={Contact} />
    <Route path="cart" component={Cart} />
    <Route path="checkout" component={Checkout} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
