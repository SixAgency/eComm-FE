import { validateMandatoryFieldsAddress } from '../helpers/validators';
import AddressAPI from './address/address_api';
import { ACTION_TYPES } from '../constants/StateConsts';

// other actions
import { setErrors, setMessage } from './page';
import { forwardTo } from './handler';

/**
 * Actions
 */

const fetch = () => ({
  type: ACTION_TYPES.address,
  payload: AddressAPI.getAddresses()
});

const set = (data) => ({
  type: ACTION_TYPES.address,
  payload: AddressAPI.setAddresses(data)
});

/**
 * Action wrappers
 * @returns {function(*): *}
 */

function getAddresses() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.user_address.isFetching) {
      dispatch(fetch());
    }
  };
}

function setAddresses(args) {
  return (dispatch) => {
    const { address } = args;
    const { isError, messages } = validateMandatoryFieldsAddress(address);
    if (isError) {
      return dispatch(setErrors(messages));
    }
    return dispatch(set(args))
      .then(() => {
        dispatch(setMessage({ isError: false, messages: args.messages }));
        forwardTo('my-account/dashboard');
      }).catch(() => {});
  };
}

export {
  getAddresses,
  setAddresses
};
