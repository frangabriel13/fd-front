import { combineReducers } from 'redux';
import manufacturerReducer from './manufacturerReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  manufacturer: manufacturerReducer,
  product: productReducer,
});


export default rootReducer;