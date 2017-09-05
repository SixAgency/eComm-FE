import { checkPayment, checkIfCanUseStoreCredit } from '../utils/utils';

export default function reducer(state = {
  isStoreCredit: false,
  canUseStoreCredit: false,
  setCheckoutAddressPending: false
}, action) {
  switch (action.type) {
    case 'SET_CART': {
      return {
        ...state,
        isStoreCredit: checkPayment(action.payload.cart, 'Spree::StoreCredit'),
        canUseStoreCredit: checkIfCanUseStoreCredit(action.payload)
      };
    }
    case 'SET_CHECKOUT_ADDRESS': {
      return { ...state, setCheckoutAddressPending: action.payload };
    }
    default: // do nothing
  }

  return state;
}
