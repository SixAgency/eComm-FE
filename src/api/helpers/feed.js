import Promise from 'bluebird';
import { getAddresses } from '../addresses';

function getCheckoutBilling(request, loggedIn, billing) {
  return new Promise((resolve, reject) => {
    try {
      let resp = {
        isError: false,
        isLoaded: true,
        isEmpty: true,
        address: {},
      };
      if (loggedIn) {
        if (billing) {
          resp = {
            isLoaded: true,
            isEmpty: true,
            address: billing,
          };
          resolve(resp);
        }
        return getAddresses(request).then((response) => {
          if (response.isError) {
            resolve(resp);
          }
          resp = {
            ...response.billing,
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
