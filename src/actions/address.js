import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setMessage } from './page';
import { validateMandatoryFieldsAddress } from '../helpers/validators';

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
      isLoaded: false,
      isEmpty: true,
      address: {},
    },
    shipping: {
      isLoaded: false,
      isEmpty: true,
      address: {},
    },
    addresses: {
      isLoaded: false,
      isEmpty: true,
      address: {},
    },
  };
  return { type: 'SET_ADDRESSES', payload: data };
}

/**
 * Set billing and shipping addresses state to the given data
 * @param billing
 * @param shipping
 * @returns {{type: string, payload: {billing: {isLoaded: boolean}, shipping: {isLoaded: boolean}}}}
 */
function setAddresses(billing, shipping, alladdresses) {
  const addresses = {
    billing: { ...billing, isLoaded: true },
    shipping: { ...shipping, isLoaded: true },
    addresses: alladdresses,
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
        dispatch(setAddresses(
          response.data.billing,
          response.data.shipping,
          response.data.addresses,
        ));
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
    const valid = validateMandatoryFieldsAddress(data.address);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
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
    }
  };
}

/**
 * Create an address
 * @param data
 * @returns {function(*=)}
 */
function createAddress(data) {
  return (dispatch) => {
    const valid = validateMandatoryFieldsAddress(data.address);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
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
    }
  };
}

/**
 * Edit & Create address entry
 * data.address.id will decide where to go - edit/create
 * @param data
 * @returns {function(*=)}
 */
function createOrEditAddress(data) {
  if (data.address.id && (data.address.id !== 0)) {
    return editAddress(data);
  }
  const address = data;
  delete address.id;
  return createAddress(address);
}

export { getAddress, resetAddresses, setAddresses, createOrEditAddress };
