import { fetch } from '../fetch';

function formatAddresses(data) {
  return {
    adrian: data.owner_address
  };
}

function testPost(req) {
  const args = {
    url: '/password/recover',
    method: 'POST',
    body: req.body,
    session: req.session,
    fn: (data) => (data)
  };
  return fetch(args);
}

function testPut(req) {
  const args = {
    url: `/api/v1/addresses/${req.params.id}`,
    method: 'PUT',
    body: req.body,
    session: req.session,
    fn: (data) => (data)
  };
  return fetch(args);
}

function testPatch(req) {
  const args = {
    url: '/api/v1/addresses/default',
    method: 'PATCH',
    body: req.body,
    session: req.session,
    fn: (data) => (data)
  };
  return fetch(args);
}

function testGet(req) {
  const args = {
    url: '/api/addresses',
    method: 'GET',
    session: req.session,
    fn: formatAddresses
  };
  return fetch(args);
}

function testDelete(req) {
  const args = {
    url: `/api/v1/addresses/${req.params.id}`,
    method: 'DELETE',
    session: req.session,
    fn: (data) => (data)
  };
  return fetch(args);
}

export {
  testGet,
  testPost,
  testPut,
  testPatch,
  testDelete
};
