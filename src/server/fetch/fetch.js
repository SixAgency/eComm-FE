import Promise from 'bluebird';
import { apiFetch } from './fetch.server';
import { setErrorResponse, setSuccessResponse } from '../proxy/response';

/**
 * Check the response and apply the appropriate functions
 * @param data
 * @param fn
 * @returns {*}
 */
function checkResponse(data, fn) {
  const { status, json } = data;
  // Server Error
  if (status > 499) {
    return Promise.reject(new Error('Server Error'));
  }
  // Client Error
  if (status < 500 && status > 399) {
    return setErrorResponse(data);
  }
  // Success
  return (fn ? fn(json) : setSuccessResponse(json));
}

/**
 * Fetch wrapper function
 *
 * @param args
 */
function fetch(args) {
  const { url, method, session, fn } = args;
  const body = args.body || {};
  let status;
  return apiFetch(url, {
    method,
    body: JSON.stringify(body)
  }, session)
    .then((resp) => {
      status = resp.status;
      return resp.json();
    })
    .then((json) => checkResponse({ status, json }, fn))
    .catch(err => Promise.reject(err));
}

export {
  fetch,
  apiFetch
};

