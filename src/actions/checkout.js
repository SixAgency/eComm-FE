import axios from 'axios';
import { checkResponse, forwardTo } from './handler';
import { setCart, getCart } from './order';
import { setMessage, resetMessages, setLoader, setPending } from './page';
import { setUser, setProfile } from './user';
import { setCheckoutAddressFeed, setCheckoutAddressesFeed } from '../helpers/feed';
import { validateRegisterCheckout, validateMandatoryFieldsAddress } from '../helpers/validators';

/**
 * Next step - we are using for ort state transition
 * @returns {function(*=)}
 */
function checkoutNext(callback) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(setLoader(true));
    dispatch(setPending(true));
    dispatch(resetMessages());
    axios.post('/api/checkout/next')
      .then((response) => checkResponse(response.data, () => {
        dispatch(setCart(response.data));
        if (callback) {
          callback();
        }
        dispatch(setPending(false));
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
        dispatch(setPending(false));
      }))
      .catch((err) => {
        console.error('Error: ', err); // eslint-disable-line no-console
      });
  };
}

/* *** New Stuff *** */
function setCheckoutAddress(data) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(data.billing);
    const validEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,5}$/.test(data.email);
    if (!validEmail) {
      valid.isError = true;
      valid.messages.push('Please enter a valid email address.');
    }
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch({ type: 'SET_CHECKOUT_ADDRESS', payload: true });
      axios.post('/api/checkout/addresses', setCheckoutAddressesFeed(data))
        .then((response) => checkResponse(response.data, () => {
          forwardTo('checkout/billing');
          dispatch(setCart(response.data));
          dispatch({ type: 'SET_CHECKOUT_ADDRESS', payload: false });
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch({ type: 'SET_CHECKOUT_ADDRESS', payload: false });
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    }
  };
}

function editOrderAddress(data, callback) {
  window.scrollTo(0, 0);
  return (dispatch) => {
    dispatch(resetMessages());
    const valid = validateMandatoryFieldsAddress(data.address);
    if (valid.isError) {
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch(setLoader(true));
      dispatch(setPending(true));
      axios.post('/api/checkout/address', setCheckoutAddressFeed(data))
        .then((response) => checkResponse(response.data, () => {
          /* Callback after edit success */
          callback();
        }, () => {
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch(setPending(false));
        }))
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
        });
    }
  };
}

function registerAndSetAddress(data) {
  return (dispatch) => {
    const valid = validateRegisterCheckout(data.checkoutAddressFields);
    let registerError = false;
    if (valid.isError) {
      window.scrollTo(0, 0);
      dispatch(setMessage({ isError: true, messages: valid.messages }));
    } else {
      dispatch({ type: 'SET_CHECKOUT_ADDRESS', payload: true });
      axios.post('/api/register', data.registrationFields)
        .then((response) => checkResponse(response.data, () => {
          // Set the user
          dispatch(setUser(response.data.user));
          dispatch(setProfile({
            isLoaded: false,
            email: data.registrationFields.email,
            f_name: '',
            l_name: ''
          }));
          return response;
        }, () => {
          registerError = true;
          window.scrollTo(0, 0);
          dispatch(setMessage({ isError: true, messages: response.data.messages }));
          dispatch({ type: 'SET_CHECKOUT_ADDRESS', payload: false });
        }))
        .then(() => {
          if (!registerError) {
            dispatch(getCart(false, () => {
              dispatch(setCheckoutAddress(data.checkoutAddressFields));
            }));
          }
        })
        .catch((err) => {
          console.error('Error: ', err); // eslint-disable-line no-console
          dispatch({ type: 'SET_CHECKOUT_ADDRESS', payload: false });
          dispatch(setMessage({ isError: true, messages: ['Something went wrong. Please try again'] }));
        });
    }
  };
}

export {
  checkoutNext,
  setCheckoutAddress,
  editOrderAddress,
  registerAndSetAddress
};
