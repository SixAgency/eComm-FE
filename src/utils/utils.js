import accounting from 'accounting';
import { NAV, ORDER_STATES } from '../constants/AppConsts';

function setNavigation(slug) {
  const navItems = [...NAV];
  Array.from(navItems).map((item) => (item.isActive = (slug === item.slug)));
  return navItems;
}

// Helper function - used to set order state
function getOrderStatus(state, refunded, shipment) {
  if (refunded || state === 'canceled') {
    return 'Canceled';
  }
  return ORDER_STATES[shipment] || '';
}

/**
 * Check and return the expected checkout step
 * based on cart state and payment method
 */
function checkCartState(props) {
  const { cartItems, isPayPal } = props;
  const state = cartItems.cart.state;
  let step;
  switch (state) {
    case 'cart':
      step = 'cart';
      break;
    case 'delivery':
      step = isPayPal ? 'checkout/review' : 'checkout/shipping';
      break;
    case 'payment':
      step = 'checkout/review';
      break;
    case 'confirm':
      step = 'checkout/review';
      break;
    default:
      step = 'checkout/billing';
      break;
  }
  return step;
}

/**
 * Helper method to determine if PayPal is used as payment method
 * @param cart
 * @returns {boolean}
 */
function checkIfPayPal(cart) {
  if (Object.keys(cart).length === 0) {
    return false;
  }
  const paypal = cart.payments.find(({ payment_method, state }) => (state !== 'invalid' && payment_method.name === 'Paypal'));
  return Boolean(paypal);
}

function checkPayment(cart, method) {
  if (Object.keys(cart).length === 0) {
    return false;
  }
  const result = cart.payments.find(({ payment_method, state }) => (state !== 'invalid' && payment_method.name.toLowerCase() === method));
  return Boolean(result);
}

/* checkout utils */
function calculateApplicableCredit(props) {
  const {
    cart: {
      display_total_available_store_credit,
      total,
      covered_by_store_credit
    }
  } = props;
  const totalCredit = Number(display_total_available_store_credit.slice(1));
  return covered_by_store_credit ? total : totalCredit;
}

function calculateTotal(props) {
  const {
    cart: {
      total
    },
    useCredits
  } = props;
  return useCredits ? total - calculateApplicableCredit(props) : total;
}

function calculateBalance(props) {
  const {
    cart: {
      total
    }
  } = props;
  return total - calculateApplicableCredit(props);
}

function useStoreCredits(args) {
  const { isPayPal, payments } = args;
  if (isPayPal) {
    return false;
  }
  return payments.filter((payment) => ((payment.state === 'checkout') && (payment.source_type !== 'Spree::StoreCredit'))).length === 0;
}

function checkIfCanUseStoreCredit(args) {
  const { cart } = args;
  if (Object.keys(cart).length === 0) {
    return false;
  }
  const isPayPal = checkPayment(cart, 'paypal');
  if (isPayPal) {
    return false;
  }
  return accounting.unformat(cart.display_total_available_store_credit) > 0;
}

export {
  checkIfPayPal,
  setNavigation,
  getOrderStatus,
  checkCartState,
  calculateApplicableCredit,
  calculateBalance,
  calculateTotal,
  useStoreCredits,
  checkIfCanUseStoreCredit,
  checkPayment
};

