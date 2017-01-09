import { apiFetch } from '../core/fetch';
import { parseError, parseResponse, parseCart } from './handlers';
import conslog from '../utils/dev';

const ORDER = '/api/v1/orders';
const CART = '/api/v1/orders/current';

/* @TODO - token & ordernumber */
const token = 'a2169dfff47ef681825af95b2a49772291777e01ea6b8985';
// const orderNumber = 'R540018862';

// Create Order
function createOrder(request) {
  conslog(request.session);
  const response = apiFetch(ORDER,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || token,
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  console.log('CREATE ORDER');
  conslog(response);
  return response;
}

// Get Order Details
function getOrder(request) {
  const number = request.query.order_number;
  const response = apiFetch(`${ORDER}/${number}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || token,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => (data))
  .catch((err) => parseError(err));
  return response;
}

// Get Cart
function getCart(request) {
  conslog(request.session);
  const response = apiFetch(CART, {
    headers: {
      'Content-Type': 'application/json',
      'X-Spree-Token': request.session.token || token,
    },
  })
  .then((data) => parseResponse(data))
  .then((data) => parseCart(data, request, createOrder))
  .catch((err) => parseError(err));
  return response;
}

// Add Item to Cart
function addToCart(request) {
  conslog(request.session);
  const item = {
    line_item: {
      variant_id: request.body.id,
      quantity: request.body.quantity,
    },
  };
  conslog(item);
  const orderNumber = request.session.orderNumber;
  const response = apiFetch(`${ORDER}/${orderNumber}/line_items`,
    {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'X-Spree-Token': request.session.token || token,
      },
    })
  .then((resp) => parseResponse(resp))
  .then((resp) => (resp))
  .catch((err) => parseError(err));
  return response;
}

// Add item to cart
// function addLineItem(request) {
//   const orderNumber = request.session.orderNumber;
//   const data = {
//     line_item: {
//       variant_id: request.body.id,
//       quantity: request.body.quantity,
//     },
//   };
//   const response = apiFetch(`ORDER/${orderNumber}/line_items`,
//     {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   .then((resp) => parseResponse(resp))
//   .then((resp) => (resp))
//   .catch((err) => parseError(err));
//   return response;
// }
// TODO - user orders
export { getOrder, getCart, addToCart };
