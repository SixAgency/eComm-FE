import capitalize from 'lodash.capitalize';
import { UNDEFINED_ERROR } from '../../constants/MessageConsts';

/**
 * Helper function to extract the messages from
 * errors object of the response
 *
 * @param errors
 * @returns array
 */
function getErrors(errors) {
  return Object.entries(errors).map(([key, value]) => {
    // By default we return key + message
    // for example: 'firstname + can not be blank.'
    // if base error we want just the error
    const message = (key === 'base') ? `${value[0]}.` : `${key} ${value[0]}.`;
    // Return the error message
    return capitalize(message);
  });
}

/**
 * Extract errors from response
 *
 * @param data
 * @returns array of errors
 */
function extractErrors(data) {
  // failed requests should contain `error`, `errors` or `exception` keys
  // see http://guides.spreecommerce.org/api/summary.html
  const { error, errors, exception } = data;
  // if there is a single error - return
  if (error) {
    return [error];
  }
  // if there are multiple errors
  if (errors) {
    return getErrors(errors);
  }
  // Send the exception in development mode
  if (process.env.NODE_ENV !== 'production' && exception) {
    return [exception];
  }
  // Send default message when no error returned from backend
  return [UNDEFINED_ERROR];
}

function extractOrderInfo(data) {
  console.log(data);
}

export {
  extractErrors,
  extractOrderInfo
};
