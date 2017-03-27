import express from 'express';
// Actions
import {
  getSession
} from '../api/session';
import { userLogin,
  userRegistration,
  userLogout,
  checkLogin,
  getProfile,
  updateProfile,
  updatePassword
} from '../api/users';
import {
  getProducts,
  getProduct,
  getMannequinHeads,
  getProductsInCategory
} from '../api/products';
import {
  addToCart,
  removeFromCart,
  updateCart,
  getOrder,
  getOrders,
  applyCouponCode,
  calculateShipping
} from '../api/orders';
import {
  checkoutSquare,
  checkoutConfirm
} from '../api/payment';
import { getAddresses,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress
} from '../api/addresses';
import { getBraintreeTokens,
  checkoutPayPal,
  checkoutNext,
  checkoutAddress
} from '../api/checkout';

import sendContact from '../api/contact';
// Helpers
import {
  validateAuth,
  validateMandatoryFieldsAddress,
  validateContactForm,
  validatePasswordUpdate,
  validateAccountUpdate,
  validateShippingCalculator } from '../helpers/validators';

const apiRoutes = express.Router();

// USER ROUTES

// login
apiRoutes.post('/login', (req, resp) => {
  // Check request data
  const valid = validateAuth(req.body);
  if (valid.isError) {
    resp.json(valid);
  } else {
    userLogin(req).then(data => resp.json(data));
  }
});
// register
apiRoutes.post('/register', (req, resp) => {
  const valid = validateAuth(req.body);
  if (valid.isError) {
    resp.json(valid);
  } else {
    userRegistration(req).then(data => resp.json(data));
  }
});
// logout
apiRoutes.post('/logout', (req, resp) => {
  userLogout(req).then(data => resp.json(data));
});
// check user
apiRoutes.get('/check', (req, resp) => {
  checkLogin(req).then(data => resp.json(data));
});

// get profile
apiRoutes
  .get('/profile', (req, resp) => {
    getProfile(req).then((data) => resp.json(data));
  })
  .post('/profile', (req, resp) => {
    const valid = validateAccountUpdate(req.body);
    if (valid.isError) {
      resp.json(valid);
    } else {
      updateProfile(req).then((data) => resp.json(data));
    }
  })
  .post('/profile/password', (req, resp) => {
    const valid = validatePasswordUpdate(req.body.passwords);
    if (valid.isError) {
      resp.json(valid);
    } else {
      updatePassword(req).then((data) => resp.json(data));
    }
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
apiRoutes
  .get('/cart/:new', (req, resp) => {
    getSession(req).then((data) => (resp.json(data)));
  })
  .post('/cart', (req, resp) => {
    addToCart(req).then((data) => (resp.json(data)));
  })
  .put('/cart', (req, resp) => {
    updateCart(req).then((data) => (resp.json(data)));
  })
  .post('/cart/remove', (req, resp) => {
    removeFromCart(req).then((data) => (resp.json(data)));
  });

// Get Order Details
apiRoutes.get('/order/:number', (req, resp) => {
  getOrder(req).then((data) => (resp.json(data)));
});

// Get User Orders
apiRoutes.get('/orders', (req, resp) => {
  getOrders(req).then((data) => (resp.json(data)));
});

// Apply coupon code
apiRoutes.put('/applycode', (req, resp) => {
  applyCouponCode(req).then((data) => {
    resp.json(data);
  });
});

// ADDRESS ROUTES - GET, CREATE and UPDATE
apiRoutes
  .get('/addresses', (req, resp) => {
    getAddresses(req, { isNew: false }).then((data) => (resp.json(data)));
  })
  .post('/addresses', (req, resp) => {
    const valid = validateMandatoryFieldsAddress(req.body.data.address);
    if (valid.isError) {
      resp.json(valid);
    } else {
      createAddress(req).then((data) => (resp.json(data)));
    }
  })
  .put('/addresses', (req, resp) => {
    const valid = validateMandatoryFieldsAddress(req.body.address);
    if (valid.isError) {
      resp.json(valid);
    } else {
      updateAddress(req).then((data) => (resp.json(data)));
    }
  })
  .post('/addresses/default', (req, resp) => {
    setDefaultAddress(req).then((data) => (resp.json(data)));
  });

// Contact
apiRoutes.post('/contact', (req, resp) => {
  const valid = validateContactForm(req.body.contact);
  if (valid.isError) {
    resp.json(valid);
  } else {
    sendContact(req).then((data) => (resp.json(data)));
  }
});

// Mannequin heads page
apiRoutes.get('/mannequin', (req, resp) => {
  getMannequinHeads(req).then((data) => (resp.json(data)));
});

apiRoutes
  .get('/checkout/braintree', (req, resp) => {
    getBraintreeTokens(req).then((data) => (resp.json(data)));
  })
  .post('/checkout/paypal', (req, resp) => {
    checkoutPayPal(req).then((data) => (resp.json(data)));
  })
  .post('/checkout/next', (req, resp) => {
    checkoutNext(req).then((data) => (resp.json(data)));
  })
  .post('/checkout/address', (req, resp) => {
    checkoutAddress(req).then((data) => (resp.json(data)));
  })
  .post('/checkout/square', (req, resp) => {
    checkoutSquare(req)
      .then((data) => resp.json(data))
      .catch((err) => {
        console.error(err);
      });
  })
  .post('/checkout/confirm', (req, resp) => {
    checkoutConfirm(req)
      .then((data) => resp.json(data))
      .catch((err) => {
        console.error(err);
      });
  });

// Products in category
apiRoutes.get('/category/:slug', (req, resp) => {
  getProductsInCategory(req).then((data) => (resp.json(data)));
});

apiRoutes.post('/calculate_shipping', (req, resp) => {
  const valid = validateShippingCalculator(req.body.data);
  if (valid.isError) {
    resp.json(valid);
  } else {
    calculateShipping(req).then((data) => (resp.json(data)));
  }
});

// Delete addres
apiRoutes.delete('/addressdelete/:id', (req, resp) => {
  deleteAddress(req).then((data) => (resp.json(data)));
});

export default apiRoutes;
