import logger from './logger';
import { extractErrors } from './common/extract';
import { SERVER_ERROR } from '../constants/MessageConsts';

/**
 * Validation and Client Error Response format
 *
 * @param data
 * @returns object
 */
function setErrorResponse(data) {
  logger.debug('Warning/Validation:', data);
  const { status, json } = data;
  return {
    status,
    error: true,
    messages: extractErrors(json)
  };
}

/**
 * Success Response format
 *
 * @param data - (string|number|boolean|array|object)
 * @param messages - array of messages
 * @returns object
 */
function setSuccessResponse(data, messages) {
  return {
    status: 200,
    data,
    messages: messages || []
  };
}

/**
 *  Server Error Response format
 *
 * @param err
 * @returns object
 */
function setInternalErrorResponse(err) {
  logger.error(err);
  return {
    status: 500,
    error: true,
    messages: [SERVER_ERROR]
  };
}

export {
  setErrorResponse,
  setInternalErrorResponse,
  setSuccessResponse
};
