import { combineReducers } from 'redux';

import user from './user';
import catalog from './catalog';
import cart from './cart';
import page from './page';

export default combineReducers({
  user,
  catalog,
  cart,
  page,
});

