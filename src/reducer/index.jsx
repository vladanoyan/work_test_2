import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import items from './items';

export default combineReducers({
  form: reduxFormReducer,
  items,
});
