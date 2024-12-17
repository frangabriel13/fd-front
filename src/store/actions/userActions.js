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