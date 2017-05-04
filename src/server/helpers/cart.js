import SessionUtils from './session';

/**
 * Set of helper methods for cart
 */
const CartUtils = {
  // Create Cart params
  createCartParams: () => ({
    order: {
      line_items: []
    }
  }),
  // Add To Cart Params
  addToCartParams: (req) => {
    const params = {
      line_item: {
        variant_id: req.params.id,
        quantity: req.body.quantity || 1,
      }
    };
    if (req.body.options) {
      params.line_item.options = req.body.options;
    }
    return params;
  },
  // Update Cart Params
  updateCartParams: (req) => ({
    order: {
      line_items: req.body.items || {}
    }
  }),
  // Set the cart session params
  setCartSession: (req, cart) => {
    const { number, token } = cart;
    SessionUtils.setSession(req, { order: number, guest_token: token });
  },
  // Check if cart response is empty
  checkCart: (cart) => Boolean(Object.getOwnPropertyNames(cart).length)
};

export default CartUtils;
