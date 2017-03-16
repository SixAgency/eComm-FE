import fetch from '../fetch';
import {
  checkStatus,
  onSuccess,
  onError
} from './handlers.js';

/**
 * Request handler
 * @param request - object
 * @param params - object
 * @param cb - function
 */
function requestWrapper(request, params, cb) {
  return fetch(params.url,
    {
      method: params.method,
      body: JSON.stringify(params.data)
    }, request.session
  )
    .then((response) => checkStatus(response))
    .then((response) => onSuccess(response))
    .then((data) => cb(request, data))
    .catch((err) => onError(err));
}

export default requestWrapper;
