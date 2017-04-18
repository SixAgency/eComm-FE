import express from 'express';
import { onGetSession } from '../server/controllers/api/session';
import { onGetProduct, onGetProducts, onGetProductByCategory } from '../server/controllers/api/product';
import { checkCart, onGetCart, onCreateCart, onAddToCart, onRemoveFromCart, onUpdateCart } from '../server/controllers/api/cart';

const apiRoutesV = express.Router();

// Check Current Session
apiRoutesV.get('/session', onGetSession);
// Create Cart
apiRoutesV.post('/cart', onCreateCart);
// Get Cart
apiRoutesV.get('/cart', checkCart, onGetCart);
// Add To Cart
apiRoutesV.post('/cart/:id', checkCart, onAddToCart);
// Update Cart
apiRoutesV.put('/cart', checkCart, onUpdateCart);
// Remove Item from the Cart
apiRoutesV.delete('/cart/:id', checkCart, onRemoveFromCart);
// Get Product by slug
apiRoutesV.get('/product/:slug', onGetProduct);
// Get Products - all or by custom param
apiRoutesV.get('/products', onGetProducts);
// Get Products by Category
apiRoutesV.get('/products/:category', onGetProductByCategory);

export default apiRoutesV;
