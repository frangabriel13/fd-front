import { combineReducers } from 'redux';
import manufacturerReducer from './manufacturerReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import wholesalerReducer from './wholesalerReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  manufacturer: manufacturerReducer,
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  wholesaler: wholesalerReducer,
  category: categoryReducer,
});


export default rootReducer;