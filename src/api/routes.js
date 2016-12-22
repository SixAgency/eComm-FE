import express from 'express';
import fetch from '../core/fetch';
import { userLogin, userRegistration, userLogout, checkLogin } from './users';
import getProducts from './products';

const apiRouter = express.Router();
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';

// USER ROUTES

// login
apiRouter.post('/login', (req, resp) => userLogin(req, resp));
// register
apiRouter.post('/register', (req, resp) => userRegistration(req, resp));
// logout
apiRouter.get('/logout', (req, resp) => userLogout(req, resp));
// check login
apiRouter.get('/check', (req, resp) => checkLogin(req, resp));
// Get all products
apiRouter.get('/products', (req, resp) => getProducts(req, resp));
// Get product based on slug
apiRouter.get('/products/:slug', (req, resp) => getProducts(req, resp));

// CART ROUTES
apiRouter.get('/cart', (req, res) => {
  const url = `http://staging.ecomm.com/api/orders/R540018862?token=${token}`;
  fetch(url)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json)))
    .catch((err) => (err.json())
      .then((json) => (res.json(json)))));
});

// PRODUCTS ROUTES
// product properties - needs product id
apiRouter.get('/product-properties', (req, res) => {
  fetch(`http://staging.ecomm.com/api/products/${req}/product_properties?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});

// ADDRESES
// order address
apiRouter.get('/order-addres', (req, res) => {
  const oId = req.param('orderId');
  const aId = req.param('addressId');
  fetch(`http://staging.ecomm.com/api/orders/${oId}/addresses/${aId}?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});

// ORDERS
// order details - needs order number
apiRouter.get('/order-details', (req, res) => {
  fetch(`http://staging.ecomm.com/api/orders/${req}?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});

// TODO - user orders

export default apiRouter;
