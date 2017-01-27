import { browserHistory } from 'react-router';

/**
 * Redirect function
 * @param location
 */
function forwardTo(location) {
  console.info(`Redirect to ${location}.`); // eslint-disable-line no-console
  browserHistory.push(`/${location}`);
}

/**
 * Server error - helper
 * @param error: object
 */
function serverError(error) {
  console.error(error); // eslint-disable-line no-console
  forwardTo('error');
}

/**
 * Wrapper function of all actions
 * @param data: object
 * @param callback: function
 * @returns {function(*)}
 */
function checkResponse(data, success, error) {
  if (data.isError) {
    // Server Error - redirect to error page
    // if (data.status === 500) {
    //   // forwardTo('error');
    // }
    // Session expired - reset user && redirect to login page
    if (data.status === 401) {
      forwardTo('my-account');
    }
    // Other error - display on the page
    error();
  } else {
    //  Everything OK - move forward
    success();
  }
}

export { checkResponse, forwardTo, serverError };
