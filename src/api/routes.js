import express from 'express';
import fetch from '../core/fetch';

const apiRouter = express.Router();
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';

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
// all products
apiRouter.get('/products', (req, res) => {
  fetch(`http://staging.ecomm.com/api/products?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});

// specific product - needs product id
apiRouter.get('/product', (req, res) => {
  fetch(`http://staging.ecomm.com/api/products/${req}?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});

// product properties - needs product id
apiRouter.get('/product-properties', (req, res) => {
  fetch(`http://staging.ecomm.com/api/products/${req}/product_properties?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});


// USER ROUTES
// login
apiRouter.get('/login', (req, res) => {
  const data = {
    spree_user: {
      email: 'adrian.sarkany@clever-software-solutions.com',
      password: 'mareparola',
      remember_me: '0',
    },
  };
  const url = 'http://staging.ecomm.com/login';
  fetch(url,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    },
  ).then(
    (resp) => (resp.json())
    .then((json) => (res.json(json))))
  .catch((err) => (err.json())
    .then((json) => (res.json(json))));
});

// logout
apiRouter.get('/logout', (req, res) => {
  fetch(`http://staging.ecomm.com/logout?token=${token}`)
    .then(
      (resp) => (resp.json())
      .then((json) => (res.json(json))))
    .catch((err) => (err.json())
      .then((json) => (res.json(json))));
});

// TODO - register

// ADDRESES
// certain address
// http://staging.ecomm.com/api/v1/orders/1/addresses/1?token=a2169dfff47ef681825af95b2a49772291777e01ea6b8985

export default apiRouter;
