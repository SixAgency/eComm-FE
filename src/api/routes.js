import express from 'express';
import { userLogin, userRegistration, userLogout, checkLogin } from './users';
import { getProducts, getProduct } from './products';
import { getOrder, getCart, addToCart, createOrder, removeFromCart } from './orders';
import { getAddresses, createAddress } from './addresses';

const apiRoutes = express.Router();

// USER ROUTES

// login
apiRoutes.post('/login', (req, resp) => {
  userLogin(req).then(data => resp.json(data));
});
// register
apiRoutes.post('/register', (req, resp) => {
  userRegistration(req).then(data => resp.json(data));
});
// logout
apiRoutes.post('/logout', (req, resp) => {
  userLogout(req).then(data => resp.json(data));
});
// check login
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

// ADDRESS ROUTES

// Get User Addresses
apiRoutes.get('/addresses', (req, resp) => {
  getAddresses(req).then((data) => (resp.json(data)));
});

// Add User Addresses
apiRoutes.post('/addaddress', (req, resp) => {
  createAddress(req).then((data) => (resp.json(data)));
});

export default apiRoutes;
