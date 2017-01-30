import express from 'express';
// Actions
import { userLogin, userRegistration, userLogout, checkLogin } from './users';
import { getProducts, getProduct } from './products';
import { getOrder, getCart, addToCart, createOrder, removeFromCart, updateCart } from './orders';
import { getAddresses, createAddress, updateAddress } from './addresses';
import sendContact from './contact';
// Helpers
import {
  validateAuth,
  validateProduct,
  validateMandatoryFieldsAddress,
  validateContactForm } from '../helpers/validators';

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
  const valid = validateProduct(req.body);
  if (valid.isError) {
    resp.json(valid);
  } else {
    addToCart(req).then((data) => {
      resp.json(data);
    });
  }
});
// Remove Item from Cart
apiRoutes.post('/removefromcart', (req, resp) => {
  const valid = validateProduct(req.body);
  if (valid.isError) {
    resp.json(valid);
  } else {
    removeFromCart(req).then((data) => {
      resp.json(data);
    });
  }
});

// Add Item To Cart
apiRoutes.post('/createorder', (req, resp) => {
  createOrder(req).then((data) => {
    resp.json(data);
  });
});

// ADDRESS ROUTES - GET, CREATE and UPDATE
apiRoutes
  .get('/addresses', (req, resp) => {
    getAddresses(req).then((data) => (resp.json(data)));
  })
  .post('/addresses', (req, resp) => {
    const valid = validateMandatoryFieldsAddress(req.body);
    if (valid.isError) {
      resp.json(valid);
    } else {
      createAddress(req).then((data) => (resp.json(data)));
    }
  })
  .put('/addresses', (req, resp) => {
    const valid = validateMandatoryFieldsAddress(req.body);
    if (valid.isError) {
      resp.json(valid);
    } else {
      updateAddress(req).then((data) => (resp.json(data)));
    }
  });

// Contact
apiRoutes.post('/contact', (req, resp) => {
  const valid = validateContactForm(req);
  if (valid.isError) {
    resp.json(valid);
  } else {
    sendContact(req).then((data) => (resp.json(data)));
  }
});

export default apiRoutes;
