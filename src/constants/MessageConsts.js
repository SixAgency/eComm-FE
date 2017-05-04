const SERVER_ERROR = 'Internal server error. Please contact your server administrator.';
const NOT_FOUND = 'The resource you were looking for could not be found.';
const UNDEFINED_ERROR = 'Something went wrong. Please try again later.';
const CART_ERROR = 'Something is wrong with your cart. Please reload the page and try again.';
const BAD_REQUEST = 'Bad request. Please contact your server administrator.';
const VALIDATION = {
  promo: {
    required: 'Promo code is required.'
  },
  credit: {
    required: 'Gift card code is required.'
  }
};

export {
  SERVER_ERROR,
  UNDEFINED_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
  CART_ERROR,
  VALIDATION
};
