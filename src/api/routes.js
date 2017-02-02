import express from 'express';
// Actions
import { userLogin, userRegistration, userLogout, checkLogin } from './users';
import { getProducts, getProduct } from './products';
import { getOrder,
  getCart,
  addToCart,
  createOrder,
  removeFromCart,
  updateCart,
  applyCouponCode } from './orders';
import { getAddresses, createAddress, updateAddress } from './addresses';
import sendContact from './contact';
import getMannequinHeads from './mannequinHeads';
// Helpers
import { validateAuth } from './helpers/validators';

const apiRoutes = express.Router();

// USER ROUTES

// login
apiRoutes.post('/login', (req, resp) => {
  // Check request data
  const valid = validateAuth(req.body);
  if (valid.isError) {
    resp.json(valid);
  } else {
    userLogin(req).then(data => resp.json(data));
  }
});
// register
apiRoutes.post('/register', (req, resp) => {
  const valid = validateAuth(req.body);
  if (valid.isError) {
    resp.json(valid);
  } else {
    userRegistration(req).then(data => resp.json(data));
  }
});
// // logout
apiRoutes.post('/logout', (req, resp) => {
  userLogout(req).then(data => resp.json(data));
});
// check user
apiRoutes.get('/check', (req, resp) => {
  checkLogin(req).then(data => resp.json(data));
});

// PRODUCT ROUTES

// Get all products
apiRoutes.get('/products', (req, resp) => {
  getProducts(req).then((data) => (resp.json(data)));
});
// Get product based on slug
apiRoutes.get('/product/:slug', (req, resp) => {
  getProduct(req).then((data) => (resp.json(data)));
});

// ORDER & CART ROUTES

// Get cart
apiRoutes
  .get('/cart', (req, resp) => {
    getCart(req).then((data) => (resp.json(data)));
  })
  .put('/cart', (req, resp) => {
    updateCart(req).then((data) => (resp.json(data)));
  });

// Get Order Details
apiRoutes.get('/order/:id', (req, resp) => {
  getOrder(req).then((data) => (resp.json(data)));
});
// Add Item To Cart
apiRoutes.post('/addtocart', (req, resp) => {
  addToCart(req).then((data) => {
    resp.json(data);
  });
});
// Remove Item from Cart
apiRoutes.post('/removefromcart', (req, resp) => {
  removeFromCart(req).then((data) => {
    resp.json(data);
  });
});

// Add Item To Cart
apiRoutes.post('/createorder', (req, resp) => {
  createOrder(req).then((data) => {
    resp.json(data);
  });
});

// Apply coupon code
apiRoutes.put('/applycode', (req, resp) => {
  applyCouponCode(req).then((data) => {
    resp.json(data);
  });
});

// ADDRESS ROUTES - GET, CREATE and UPDATE
/* @TODO - add validation */
apiRoutes
  .get('/addresses', (req, resp) => {
    getAddresses(req).then((data) => (resp.json(data)));
  })
  .post('/addresses', (req, resp) => {
    createAddress(req).then((data) => (resp.json(data)));
  })
  .put('/addresses', (req, resp) => {
    updateAddress(req).then((data) => (resp.json(data)));
  });

// Contact
apiRoutes.post('/contact', (req, resp) => {
  sendContact(req).then((data) => (resp.json(data)));
});

// Mannequin heads page
apiRoutes.get('/mannequinHeads', (req, resp) => {
  getMannequinHeads(req).then((data) => (resp.json(data)));
});

export default apiRoutes;
