import { AES, enc } from 'crypto-js';
import { getInitialStore } from 'helpers/state';
import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware(promise(), thunk, logger());

const st = document.getElementById('st').innerText;
document.getElementById('st').remove();
let initialState;
try {
  initialState = JSON.parse(AES.decrypt(st, 'secret key 123').toString(enc.Utf8));
} catch (e) {
  console.error(e);
  initialState = getInitialStore();
}

export default createStore(reducer, initialState, middleware);
