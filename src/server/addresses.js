import { apiFetch } from './fetch';
import {
  setError,
  checkResponse
} from './helpers/handlers';
import { mapAddressFeedToState, mapAddressStateToFeed } from '../helpers/feed';

// Get Addresses @TODO - refactor it
function getAddresses(request) {
  let status;
  return apiFetch('/api/v1/addresses', {}, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => {
      if (data.isError) {
        return {
          isError: true,
          messages: data.messages,
          status: data.status
        };
      }
      return {
        status: 200,
        data: {
          billing: mapAddressFeedToState(data.bill_address),
          shipping: mapAddressFeedToState(data.ship_address)
        }
      };
    })
    .catch((err) => setError(err));
}

// Create Address @TODO - refactor it
function setAddresses(request) {
  let status;
  const body = {
    address: mapAddressStateToFeed(request.body.address),
    default_address_types: request.body.addressTypes
  };
  return apiFetch('/api/v1/addresses',
    {
      method: 'POST',
      body: JSON.stringify(body)
    }, request.session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse(json, status))
    .then((data) => {
      if (data.isError) {
        return {
          isError: true,
          messages: data.messages,
          status: data.status
        };
      }
      const response = {
        status: 200,
        data: {}
      };
      if (request.body.addressTypes.includes('bill_address')) {
        response.data.billing = mapAddressFeedToState(data.address);
      }
      if (request.body.addressTypes.includes('ship_address')) {
        response.data.shipping = mapAddressFeedToState(data.address);
      }
      return response;
    })
    .catch((err) => setError(err));
}

export {
  getAddresses,
  setAddresses
};
