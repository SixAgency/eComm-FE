import logger from '../logger';
import { extractErrors } from '../common/extract';
import { SERVER_ERROR } from '../../constants/MessageConsts';

/**
 * Validation and Client Error Response format
 *
 * @param data
 * @returns object
 */
function setErrorResponse(data) {
  logger.debug('Failed:', data);
  const { status, messages, json } = data;
  return {
    status,
    error: true,
    messages: messages || extractErrors(json)
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
    messages: [SERVER_ERROR],
    exception: err.message
  };
}

/**
 * Send Success/Client error response
 * @param resp
 * @param data
 */
function sendSuccessResponse(resp, data) {
  resp.status(data.status).json(data);
}

/**
 * Send Internal Server error response
 * @param resp
 * @param err
 */
function sendErrorResponse(resp, err) {
  const data = setInternalErrorResponse(err);
  resp.status(data.status).json(data);
}

export {
  setErrorResponse,
  setInternalErrorResponse,
  setSuccessResponse,
  sendSuccessResponse,
  sendErrorResponse
};
