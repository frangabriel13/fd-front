import { combineReducers } from 'redux';
import manufacturerReducer from './manufacturerReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  manufacturer: manufacturerReducer,
  product: productReducer,
  user: userReducer,
});


export default rootReducer;