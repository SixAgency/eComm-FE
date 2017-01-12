import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from '../components/Layout';
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

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeWrapper} />
    <Route path="biography" component={BiographyWrapper} />
    <Route path="my-account" component={AccountWrapper}>
      <Route path="dashboard" component={DashboardWrapper} />
      <Route path="edit-account" component={ProfileWrapper}>
        <Route path="billing" component={BillingWrapper} />
        <Route path="shipping" component={ShippingWrapper} />
      </Route>
    </Route>
    <Route path="product/:slug" component={ProductWrapper} />
    <Route path="product-category/:slug" component={CategoryWrapper} />
    <Route path="contact" component={ContactWrapper} />
    <Route path="cart" component={CartWrapper} />
    <Route path="checkout" component={CheckoutWrapper} />
    <Route path="*" component={NotFoundWrapper} />
  </Route>
);

export default routes;
