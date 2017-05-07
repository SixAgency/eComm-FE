import { checkPayment, checkIfCanUseStoreCredit } from '../utils/utils';

export default function reducer(state = {
  isPayPal: false,
  isStoreCredit: false,
  canUseStoreCredit: false,
  paypal: {
    isLoaded: false,
    isEmpty: true,
    tokens: {}
  }
}, action) {
  switch (action.type) {
    case 'SET_PAYPAL': {
      return { ...state, paypal: action.payload };
    }
    case 'SET_CART': {
      return {
        ...state,
        isPayPal: checkPayment(action.payload.cart, 'paypal'),
        isStoreCredit: checkPayment(action.payload.cart, 'store credit'),
        canUseStoreCredit: checkIfCanUseStoreCredit(action.payload)
      };
    }
    default: // do nothing
  }

  return state;
}
