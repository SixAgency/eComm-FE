import express from 'express';
import { onGetSession } from '../server/controllers/api/session';
import { checkCart, onGetCart, onCreateCart, onAddToCart, onRemoveFromCart, onUpdateCart } from '../server/controllers/api/cart';

const apiRoutesV = express.Router();

// Check Current Session
apiRoutesV.get('/session', onGetSession);
// Get Cart
apiRoutesV.get('/cart', onGetCart);
// Create Cart
apiRoutesV.post('/cart', onCreateCart);
// Add To Cart
apiRoutesV.post('/cart/:id', checkCart, onAddToCart);
// Update Cart
apiRoutesV.put('/cart', checkCart, onUpdateCart);
// Remove Item from the Cart
apiRoutesV.delete('/cart/:id', checkCart, onRemoveFromCart);

export default apiRoutesV;
