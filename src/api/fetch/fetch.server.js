import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';
import logger from '../logger';
import { api } from '../../config';

fetch.Promise = Promise;
Response.Promise = Promise;

function apiUrl(slug) {
  return `${api}${slug}`;
}

function checkToken(session) {
  return session && session.user_token;
}

function setHeaders(options, session) {
  const headers = {
    'Content-Type': 'application/json'
  };
  if (checkToken(session)) {
    headers['X-Spree-Token'] = session.user_token;
  }
  Object.assign(options, { headers });
  return options;
}

function apiFetch(slug, options, session) {
  const url = apiUrl(slug);
  const opts = setHeaders(options, session);
  logger.debug('Request', { url, options: opts });
  return fetch(url, opts);
}

export { apiFetch as default, apiFetch, Request, Headers, Response };
