import { combineReducers } from 'redux';

import catalog from './catalog';
import cart from './cart';
import page from './page';

export default combineReducers({
  catalog,
  cart,
  page,
});

