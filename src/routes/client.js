import React from 'react';
import { IndexRoute, IndexRedirect, Route } from 'react-router';
import Layout from '../components/Layout';
// Pages
import HomeWrapper from '../pages/Home';
import BiographyWrapper from '../pages/Biography';
import CartWrapper from '../pages/Cart';
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
//Checkout
import BillingCheckout from '../pages/Checkout/Billing';
import ShippingCheckout from '../pages/Checkout/Shipping';
import PromoCheckout from '../pages/Checkout/Promo';
import ReviewCheckout from '../pages/Checkout/Review';

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
      <Route path="view-order/:number" component={ViewOrderWrapper} title="My Account" />
    </Route>
    <Route path="product/:slug" component={ProductWrapper} title="Category" />
    <Route path="product-category/:slug" component={CategoryWrapper} />
    <Route path="contact" component={ContactWrapper} title="Contact" />
    <Route path="ks-mannequin-heads" component={MannequinHeadsWrapper} title="ks Mannequin Heads" />
    <Route path="cart" component={CartWrapper} title="Cart" />
    <Route path="checkout">
      <IndexRedirect to="/checkout/billing" />
      <Route path="billing" component={BillingCheckout} title="Checkout" />
      <Route path="shipping" component={ShippingCheckout} title="Checkout" />
      <Route path="promo" component={PromoCheckout} title="Checkout" />
      <Route path="review" component={ReviewCheckout} title="Checkout" />
    </Route>
    <Route path="error" component={ErrorPageWrapper} title="Error" />
    <Route path="*" component={NotFoundWrapper} title="Page Not Found" />
  </Route>
);

export default routes;
