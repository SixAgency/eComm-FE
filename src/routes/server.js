import express from 'express';
import { home, biography, contact } from '../server/controllers/main';
import cart from '../server/controllers/cart';
import { product, category, ksMannequin } from '../server/controllers/product';
import { checkoutBilling, checkoutShipping, checkoutPromo, checkoutReview } from '../server/controllers/checkout';
import { auth, password, reset } from '../server/controllers/auth';
import {
  checkUser,
  dashboard,
  editAccount,
  editPassword,
  editShipping,
  editBilling,
  manageAddresses,
  viewOrder
} from '../server/controllers/account';
import { error, notFound } from '../server/common/render';

const siteRoutes = express.Router();

// Homepage
siteRoutes.get('/', home);
// Biography Page
siteRoutes.get('/biography', biography);
// Contact Page
siteRoutes.get('/contact', contact);
// Cart Page
siteRoutes.get('/cart', cart);
// Product Details Page
siteRoutes.get('/product/:slug', product);
// Product Category Grids
siteRoutes.get('/product-category/:slug', category);
siteRoutes.get('/ks-mannequin-heads', ksMannequin);
// My Account - Login/Register
siteRoutes.get('/my-account', auth);
// My Account - Lost Password
siteRoutes.get('/my-account/lost-password', password);
// My Account - Reset Password
siteRoutes.get('/my-account/lost-password/:param', reset);
siteRoutes.get('/user/spree_user/password/edit', reset);
// My Account - Dashboard
siteRoutes.get('/my-account/dashboard', checkUser, dashboard);
// My Account - Edit Profile
siteRoutes.get('/my-account/edit-account', checkUser, editAccount);
// My Account - Edit Password
siteRoutes.get('/my-account/edit-password', checkUser, editPassword);
// My Account - Shipping
siteRoutes.get('/my-account/address/shipping', checkUser, editShipping);
// My Account - Billing
siteRoutes.get('/my-account/address/billing', checkUser, editBilling);
// My Account - Manage Addresses
siteRoutes.get('/my-account/address/manage', checkUser, manageAddresses);
// My Account - View Order
siteRoutes.get('/my-account/view-order/:number', viewOrder);
// Checkout - Billing
siteRoutes.get('/checkout/billing', checkoutBilling);
// Checkout - Shipping
siteRoutes.get('/checkout/shipping', checkoutShipping);
// Checkout - Promo
siteRoutes.get('/checkout/promo', checkoutPromo);
// Checkout - Review
siteRoutes.get('/checkout/review', checkoutReview);
// Error Page
siteRoutes.get('/error', error);
// Not Found Page
siteRoutes.get('*', notFound);

export default siteRoutes;
