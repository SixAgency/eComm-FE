import express from 'express';
import { onGetSession } from '../server/controllers/api/session';
import { onGetOrder, onGetOrders } from '../server/controllers/api/order';
import { onGetProduct, onGetProducts, onGetProductByCategory } from '../server/controllers/api/product';
import { onGetCart, onCreateCart, onAddToCart, onRemoveFromCart, onUpdateCart } from '../server/controllers/api/cart';
import onApplyPromo from '../server/controllers/api/promo';
import { onGetStoreCredit, onRedeemStoreCredit, onApplyStoreCredit} from '../server/controllers/api/store_credit';
// Middleware methods
import { checkCart, checkPromoCode, checkStoreCreditCode, checkStoreCreditApply } from '../server/middleware';

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
// Get Order
apiRoutesV.get('/order/:number', onGetOrder);
// Get Orders
apiRoutesV.get('/orders', onGetOrders);
// Get Product by slug
apiRoutesV.get('/product/:slug', onGetProduct);
// Get Products - all or by custom param
apiRoutesV.get('/products', onGetProducts);
// Get Products by Category
apiRoutesV.get('/products/:category', onGetProductByCategory);
// Apply Promo Code
apiRoutesV.post('/promo', checkPromoCode, onApplyPromo);
// Get Store credit
apiRoutesV.get('/store_credit', onGetStoreCredit);
// Redeem Store credit
apiRoutesV.post('/store_credit', checkStoreCreditCode, onRedeemStoreCredit);
// Use Store credit
apiRoutesV.put('/store_credit', checkStoreCreditApply, onApplyStoreCredit);

export default apiRoutesV;
