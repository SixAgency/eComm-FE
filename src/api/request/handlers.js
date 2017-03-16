import logger from '../logger';

function success(response) {
  return response.json();
}
function badRequest(err) {
  return 'bad request';
}
function notAuthorized(err) {
  return 'not authorized';
}
function notFound(err) {
  return 'not found';
}
function conflict(err) {
  return 'conflict';
}
function unProcessable(err) {
  return 'unprocessable entity';
}
function serverError(err) {
  return 'server error';
}

const functions = {
  200: success,
  201: success,
  204: success,
  400: badRequest,
  401: notAuthorized,
  404: notFound,
  409: conflict,
  422: unProcessable,
  500: serverError
};

function checkStatus(data) {
  return functions[data.status](data);
}

function onSuccess(data) {
  return {
    isError: false,
    isEmpty: Object.getOwnPropertyNames(data).length === 0,
    data
  };
}

function onError(err) {
  logger.error('error', err);
}

export {
  checkStatus,
  onSuccess,
  onError
};
