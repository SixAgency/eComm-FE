import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';

/**
 * Reset the addresses to initial state
 * @returns {
 *  { type: string,
 *  payload: {
 *    billing: {isEmpty: boolean, address: {}},
 *    shipping: {isEmpty: boolean, address: {}}}
 *  }
 * }
 */
function resetAddresses() {
  const data = {
    billing: {
      isEmpty: true,
      address: {},
    },
    shipping: {
      isEmpty: true,
      address: {},
    },
  };
  return { type: 'RESET_ADDRESSES', payload: data };
}

/**
 * Set billing and shipping addresses state to the given data
 * @param billing
 * @param shipping
 * @returns {{type: string, payload: {billing: {isLoaded: boolean}, shipping: {isLoaded: boolean}}}}
 */
function setAddresses(billing, shipping) {
  const addresses = {
    billing: { ...billing, isLoaded: true },
    shipping: { ...shipping, isLoaded: true },
  };
  return { type: 'SET_ADDRESSES', payload: addresses };
}

/**
 * Set billing or shipping address state based on type given
 * @param address
 * @param type
 * @returns {{type: *, payload: {isLoaded: boolean}}}
 */
function setAddress(address, type) {
  const data = { ...address, isLoaded: true };
  return { type, payload: data };
}

/**
 * Get user billing & shipping address
 * @returns {function(*=)}
 */
function getAddress() {
  return (dispatch) => {
    axios.get('/api/addresses')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setAddresses(response.data.billing, response.data.shipping));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/**
 * Edit an existing address
 * @param data
 * @returns {function(*=)}
 */
function editAddress(data) {
  return (dispatch) => {
    axios.put('/api/addresses', data)
      .then((response) => checkResponse(response.data, () => {
        if (data.address_type === 'bill_address') {
          dispatch(setAddress(response.data.billing, 'SET_BILLING'));
        } else {
          dispatch(setAddress(response.data.shipping, 'SET_SHIPPING'));
        }
        forwardTo('my-account/dashboard');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/**
 * Create an address
 * @param data
 * @returns {function(*=)}
 */
function createAddress(data) {
  return (dispatch) => {
    axios.post('/api/addresses', data)
      .then((response) => checkResponse(response.data, () => {
        if (data.address_type === 'bill_address') {
          dispatch(setAddress(response.data.billing, 'SET_BILLING'));
        } else {
          dispatch(setAddress(response.data.shipping, 'SET_SHIPPING'));
        }
        forwardTo('my-account/dashboard');
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/**
 * Edit & Create address entry
 * data.address.id will decide where to go - edit/create
 * @param data
 * @returns {function(*=)}
 */
function createOrEditAddress(data) {
  console.log(data);
  if (data.address.id && (data.address.id !== 0)) {
    console.log('here');
    return editAddress(data);
  }
  const address = data;
  delete address.id;
  console.log('here2');
  return createAddress(address);
}

export { getAddress, resetAddresses, setAddresses, createOrEditAddress };
