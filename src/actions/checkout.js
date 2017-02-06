import axios from 'axios';
import { checkResponse } from './handler';
import { setMessage } from './page';
import conslog from '../utils/dev';

// Next Checkout Step
function checkoutNext() {
  return (dispatch) => {
    axios.put('/api/checkoutnext')
      .then((response) => checkResponse(response.data, () => {
        dispatch({ type: 'NEXT_CHECKOUT_SUCCESS', payload: response.data });
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        dispatch({ type: 'NEXT_CHECKOUT_ERROR', payload: err });
      });
  };
}

function checkoutNextDelivery(data) {
  return (dispatch) => {
    axios.put('/api/checkoutnextdelivery', data)
      .then((response) => checkResponse(response.data, () => {
        dispatch({ type: 'NEXT_CHECKOUT_SUCCESS', payload: response.data });
      }, () => {
        dispatch(setMessage({ isError: true, messages: response.data.messages }));
      }))
      .catch((err) => {
        dispatch({ type: 'NEXT_CHECKOUT_ERROR', payload: err });
      });
  };
}

export { checkoutNext, checkoutNextDelivery };
