import express from 'express';
import { userLogin, userRegistration, userLogout, checkLogin } from './users';
import getProducts from './products';
import getCart from './cart';
import getOrderDetails from './orders';

const apiRouter = express.Router();

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
// Get cart
apiRouter.get('/cart', (req, resp) => getCart(req, resp));
// Get Order Details
apiRouter.get('/order-details', (req, resp) => getOrderDetails(req, resp));

export default apiRouter;
