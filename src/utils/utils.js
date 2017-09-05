import accounting from 'accounting';
import isEmpty from 'lodash.isempty';
import { ORDER_STATES } from '../constants/AppConsts';

// Helper function - used to set order state
function getOrderStatus(state, refunded, shipment) {
  if (refunded) {
    return 'Refunded';
  }
  if (state === 'canceled') {
    return 'Canceled';
  }
  return ORDER_STATES[shipment] || '';
}

/**
 * Check and return the expected checkout step
 * based on cart state and payment method
 */
function checkCartState(props) {
  const { cartItems } = props;
  const state = cartItems.cart.state;
  let step;
  if (isEmpty(state)) {
    return 'my-account';
  }
  switch (state) {
    case 'cart':
      step = 'cart';
      break;
    case 'delivery':
      step = 'checkout/billing';
      break;
    case 'payment':
      step = 'checkout/review';
      break;
    case 'confirm':
      step = 'checkout/review';
      break;
    default:
      step = 'checkout/shipping';
      break;
  }
  return step;
}

function checkPayment(cart, method) {
  if (isEmpty(cart)) {
    return false;
  }
  const result = cart.payments.find(({ source_type, state }) => (state !== 'invalid' && source_type === method));
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

function checkIfCanUseStoreCredit(args) {
  const { cart } = args;
  if (isEmpty(cart)) {
    return false;
  }
  return accounting.unformat(cart.display_total_available_store_credit) > 0;
}

function scrollToTop(duration) {
  if (duration > 0) {
    const diff = document.body.scrollTop;
    const step = (diff / duration) * 10;
    setTimeout(() => {
      document.body.scrollTop -= step;
      if (document.body.scrollTop > 0) {
        scrollToTop(duration - 10);
      }
    }, 10);
  }
}

function containsGiftCard(cart) {
  const giftCard = cart.line_items.find((item) => (
    item.variant.slug === 'e-gift-certificates'
  ));
  if (giftCard) {
    return true;
  }
  return false;
}

export {
  getOrderStatus,
  checkCartState,
  calculateApplicableCredit,
  calculateBalance,
  calculateTotal,
  checkIfCanUseStoreCredit,
  checkPayment,
  scrollToTop,
  containsGiftCard
};

