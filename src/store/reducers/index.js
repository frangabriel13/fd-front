import { combineReducers } from 'redux';
import manufacturerReducer from './manufacturerReducer';

const rootReducer = combineReducers({
  manufacturer: manufacturerReducer,
});


export default rootReducer;