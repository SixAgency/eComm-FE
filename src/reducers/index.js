import { combineReducers } from 'redux';

import user from './user';
import address from './address';
import catalog from './catalog';
import cart from './cart';
import page from './page';
import contact from './contact';

export default combineReducers({
  user,
  address,
  catalog,
  cart,
  page,
  contact,
});

