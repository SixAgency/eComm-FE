import { combineReducers } from 'redux';

import catalog from './catalog';
import page from './page';

export default combineReducers({
  catalog,
  page,
});

