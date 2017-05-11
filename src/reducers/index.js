import { combineReducers } from 'redux';

import user from './user';
import address from './address';
import user_address from './user_address';
import catalog from './catalog';
import cart from './cart';
import page from './page';
import contact from './contact';
import orders from './orders';
import checkout from './checkout';

export default combineReducers({
  user,
  address,
  user_address,
  catalog,
  cart,
  page,
  contact,
  orders,
  checkout
});

