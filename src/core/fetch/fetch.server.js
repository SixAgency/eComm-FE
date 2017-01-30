import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';
import { host, api } from '../../config';

fetch.Promise = Promise;
Response.Promise = Promise;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${host}${url}`;
}

function apiUrl(slug) {
  return `${api}${slug}`;
}

function localFetch(url, options) {
  return fetch(localUrl(url), options);
}

function apiFetch(slug, options) {
  return fetch(apiUrl(slug), options);
}

export { localFetch as default, apiFetch, Request, Headers, Response };
