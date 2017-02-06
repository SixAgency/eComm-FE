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
import MannequinHeadsWrapper from '../pages/MannequinHeads';
import NotFoundWrapper from '../pages/NotFound';
import ErrorPageWrapper from '../pages/Error/ErrorPageWrapper';
// My Account
import AccountWrapper from '../pages/Account/Account';
import DashboardWrapper from '../pages/Account/Dashboard';
import ProfileWrapper from '../pages/Account/Profile';
import BillingWrapper from '../pages/Account/Billing';
import ShippingWrapper from '../pages/Account/Shipping';
import LostPasswordWrapper from '../pages/Account/LostPassword';
import ViewOrderWrapper from '../pages/Account/ViewOrder';

function onChange() {
  window.scrollTo(0, 0);
}

const routes = (
  <Route path="/" component={Layout} onChange={onChange}>
    <IndexRoute component={HomeWrapper} title="Shop" />
    <Route path="biography" component={BiographyWrapper} title="Biography" />
    <Route path="my-account">
      <IndexRoute component={AccountWrapper} title="My Account" />
      <Route path="dashboard" component={DashboardWrapper} title="My Account" />
      <Route path="edit-account" component={ProfileWrapper} title="Edit Account" />
      <Route path="edit-address">
        <Route path="billing" component={BillingWrapper} title="Edit Billing Address" />
        <Route path="shipping" component={ShippingWrapper} title="Edit Shipping Address" />
      </Route>
      <Route path="lost-password" component={LostPasswordWrapper} title="My Account" />
      <Route path="view-order" component={ViewOrderWrapper} title="My Account" />
    </Route>
    <Route path="product/:slug" component={ProductWrapper} title="Category" />
    <Route path="product-category/:slug" component={CategoryWrapper} />
    <Route path="contact" component={ContactWrapper} title="Contact" />
    <Route path="ks-mannequin-heads" component={MannequinHeadsWrapper} title="ks Mannequin Heads" />
    <Route path="cart" component={CartWrapper} title="Cart" />
    <Route path="checkout" component={CheckoutWrapper} title="Checkout" />
    <Route path="error" component={ErrorPageWrapper} title="Error" />
    <Route path="*" component={NotFoundWrapper} title="Page Not Found" />
  </Route>
);

export default routes;
