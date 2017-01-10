import express from 'express';
import { userLogin, userRegistration, userLogout, checkLogin } from './users';
import getProducts from './products';
import { getOrder, getCart, addToCart, createOrder } from './orders';
import { getAddresses } from './addresses';

const apiRoutes = express.Router();

// USER ROUTES

// login
apiRoutes.post('/login', (req, resp) => userLogin(req, resp));
// register
apiRoutes.post('/register', (req, resp) => userRegistration(req, resp));
// logout
apiRoutes.get('/logout', (req, resp) => userLogout(req, resp));
// check login
apiRoutes.get('/check', (req, resp) => {
  resp.json(checkLogin(req));
});

// PRODUCT ROUTES

// Get all products
apiRoutes.get('/products', (req, resp) => {
  getProducts(req).then((data) => (resp.json(data)));
});
// Get product based on slug
apiRoutes.get('/products/:slug', (req, resp) => {
  getProducts(req).then((data) => (resp.json(data)));
});

// ORDER & CART ROUTES

// Get cart
apiRoutes.get('/cart', (req, resp) => {
  getCart(req).then((data) => (resp.json(data)));
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

// Add Item To Cart
apiRoutes.post('/createorder', (req, resp) => {
  createOrder(req).then((data) => {
    resp.json(data);
  });
});

// ADDRESS ROUTES

// Get User Addresses
apiRoutes.get('/addresses', (req, resp) => {
  getAddresses(req).then((data) => (resp.json(data)));
});

export default apiRoutes;
