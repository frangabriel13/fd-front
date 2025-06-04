import { userInstance } from "../../utils/axiosConfig";

export const registerUser = (email, password) => async (dispatch) => {
  dispatch({ type: 'REGISTER_USER_REQUEST' });
  try {
    const response = await userInstance.post('/register', {
      email,
      password,
    });
    dispatch({
      type: 'REGISTER_USER_SUCCESS',
      payload: response.data,
    });
    return { success: true };
  } catch(error) {
    dispatch({
      type: 'REGISTER_USER_FAILURE',
      message: error.message,
    });
    return { success: false, message: error.response.data };
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  dispatch({ type: 'VERIFY_EMAIL_REQUEST' });
  try {
    const response = await userInstance.get('/verify-email?token=' + token);
    dispatch({
      type: 'VERIFY_EMAIL_SUCCESS',
      payload: response.data,
    });
  } catch(error) {
    dispatch({
      type: 'VERIFY_EMAIL_FAILURE',
      error: error.message,
    });
  }
};

export const getMe = () => async (dispatch) => {
  dispatch({ type: 'GET_ME_REQUEST' });
  try {
    const response = await userInstance.get('/me');
    dispatch({
      type: 'GET_ME_SUCCESS',
      payload: response.data,
    });
  } catch(error) {
    dispatch({
      type: 'GET_ME_FAILURE',
      error: error.message,
    });
  }
};

export const getFollowedManufacturers = () => async (dispatch) => {
  dispatch({ type: 'GET_FOLLOWED_MANUFACTURERS_REQUEST' });
  try {
    const response = await userInstance.get('/followed-manufacturers');
    dispatch({
      type: 'GET_FOLLOWED_MANUFACTURERS_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_FOLLOWED_MANUFACTURERS_FAILURE',
      error: error.message,
    });
  }
};

export const followManufacturer = (manufacturerId) => async (dispatch) => {
  dispatch({ type: 'FOLLOW_MANUFACTURER_REQUEST' });
  try {
    const response = await userInstance.post(`/follow/${manufacturerId}`);
    dispatch({
      type: 'FOLLOW_MANUFACTURER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FOLLOW_MANUFACTURER_FAILURE',
      error: error.message,
    });
  }
};

export const unfollowManufacturer = (manufacturerId) => async (dispatch) => {
  dispatch({ type: 'UNFOLLOW_MANUFACTURER_REQUEST' });
  try {
    const response = await userInstance.delete(`/unfollow/${manufacturerId}`);
    console.log(response.data);
    dispatch({
      type: 'UNFOLLOW_MANUFACTURER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'UNFOLLOW_MANUFACTURER_FAILURE',
      error: error.message,
    });
  }
};