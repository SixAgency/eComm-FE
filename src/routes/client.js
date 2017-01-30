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
import ksMannequinHeadsWrapper from '../pages/ksMannequinHeads';
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

// Function to update SEO tags.
function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}
function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}
function updateCustomMeta(property, content) { // eslint-disable-line no-unused-vars
  updateTag('meta', 'property', property, 'content', content);
}
function updateLink(rel, href) { // eslint-disable-line no-unused-vars
  updateTag('link', 'rel', rel, 'href', href);
}

const routes = (
  <Route path="/" component={Layout} onChange={onChange}>
    <IndexRoute component={HomeWrapper} />
    <Route path="biography" component={BiographyWrapper} />
    <Route path="my-account">
      <IndexRoute component={AccountWrapper} />
      <Route path="dashboard" component={DashboardWrapper} />
      <Route path="edit-account" component={ProfileWrapper} />
      <Route path="edit-address">
        <Route path="billing" component={BillingWrapper} />
        <Route path="shipping" component={ShippingWrapper} />
      </Route>
      <Route path="lost-password" component={LostPasswordWrapper} />
      <Route path="view-order" component={ViewOrderWrapper} />
    </Route>
    <Route path="product/:slug" component={ProductWrapper} />
    <Route path="product-category/:slug" component={CategoryWrapper} />
    <Route path="contact" component={ContactWrapper} />
    <Route path="ks-mannequin-heads" component={ksMannequinHeadsWrapper} />
    <Route path="cart" component={CartWrapper} />
    <Route path="checkout" component={CheckoutWrapper} />
    <Route path="error" component={ErrorPageWrapper} />
    <Route path="*" component={NotFoundWrapper} />
  </Route>
);

export default routes;
