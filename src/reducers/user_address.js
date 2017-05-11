import { ACTION_TYPES, DEFAULT_VALUES } from '../constants/StateConsts';

export default function reducer(state = {
  billing: DEFAULT_VALUES.address,
  shipping: DEFAULT_VALUES.address,
  isFetching: false,
  isFetched: false,
  isError: false,
  messages: []
}, action) {
  switch (action.type) {
    case `${ACTION_TYPES.address}_PENDING`: {
      return {
        ...state,
        isFetched: false,
        isFetching: true
      };
    }
    case `${ACTION_TYPES.address}_FULFILLED`: {
      return {
        ...state,
        ...action.payload.data.data,
        isFetched: true,
        isFetching: false
      };
    }
    case `${ACTION_TYPES.address}_REJECTED`: {
      return {
        ...state,
        ...action.payload.response.data,
        isError: true,
        isFetching: false,
        isFetched: true
      };
    }
    case 'RESET_MESSAGES': {
      return {
        ...state,
        isError: false,
        messages: []
      };
    }
    default: // do nothing
  }

  return state;
}
