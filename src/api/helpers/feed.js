import Promise from 'bluebird';
import { getAddresses } from '../addresses';

function getCheckoutBilling(cart, addresses) {
  if ((cart.cart.state !== 'cart' || cart.cart.state !== 'address')) {
    const { isEmpty } = addresses.billing.isEmpty;
    if (isEmpty) {
      return null;
    }
    return addresses.billing.address.id;
  }
  return cart.cart.bill_address.selected_address_id;
}

function getCheckoutShipping(request, loggedIn, shipping) {
  return new Promise((resolve, reject) => {
    try {
      let resp = {
        isError: false,
        isLoaded: true,
        isEmpty: true,
        address: {},
      };
      if (loggedIn) {
        if (shipping) {
          resp = {
            isLoaded: true,
            isEmpty: true,
            address: shipping,
          };
          resolve(resp);
        }
        return getAddresses(request).then((response) => {
          if (response.isError) {
            resolve(resp);
          }
          resp = {
            ...response.shipping,
            isLoaded: true,
          };
          resolve(resp);
        });
      }
      resolve(resp);
    } catch (err) {
      reject(err);
    }
  });
}

export { getCheckoutBilling, getCheckoutShipping };
