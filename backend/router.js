const _handler = require('./apiHandler');
const express = require('express');
// const app = express();
const router = express.Router();

// Products routes
router.route('/products').get(_handler.getProducts);
router.route('/product').get(_handler.getProduct);
// Cart routes
router.route('/cart').get(_handler.getCart);
// Users routes
router.route('/login').post(_handler.loginUser);


module.exports = router;

