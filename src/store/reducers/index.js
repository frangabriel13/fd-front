import { combineReducers } from 'redux';
import manufacturerReducer from './manufacturerReducer';
import productReducer from './productReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import wholesalerReducer from './wholesalerReducer';
import categoryReducer from './categoryReducer';
import sizeReducer from './seizeReducer';
import imageReducer from './imageReducer';
import colorReducer from './colorReducer';
import packReducer from './packReducer';
import genderReducer from './genderReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import reviewReducer from './reviewReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({
  manufacturer: manufacturerReducer,
  product: productReducer,
  user: userReducer,
  auth: authReducer,
  wholesaler: wholesalerReducer,
  category: categoryReducer,
  size: sizeReducer,
  image: imageReducer,
  color: colorReducer,
  pack: packReducer,
  gender: genderReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,
  favorite: favoriteReducer,
});


export default rootReducer;