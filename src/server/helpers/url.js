/**
 * Insert guest token into url
 * @param args
 * @returns {*}
 */
function asGuestUrl(args) {
  const { req, url } = args;
  if (req.session.user_token) {
    return url;
  }
  return `${url}?order_token=${req.session.guest_token}`;
}

const UrlUtils = {
  addToCart: (req) => asGuestUrl({
    url: `/api/v1/orders/${req.session.order}/line_items`,
    req
  }),
  removeFromCart: (req) => asGuestUrl({
    url: `/api/v1/orders/${req.session.order}/line_items/${req.params.id}`,
    req
  }),
  updateCart: (req) => asGuestUrl({
    url: `/api/v1/orders/${req.session.order}`,
    req
  }),
  getProduct: (req) => (`/api/v1/products/${req.params.slug}`),
  getProducts: () => ('/api/v1/products'),
  getProductsByCategory: (req) => (`/api/v1/taxons/products?permalink=categories/${req.params.category}`),
  getOrder: (req) => asGuestUrl({
    url: `/api/v1/orders/${req.params.number}`,
    req
  }),
  getOrders: () => ('/api/v1/orders/mine?q[state_cont_any][]=complete&q[state_cont_any][]=canceled')
};

export default UrlUtils;
