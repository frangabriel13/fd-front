import { authInstance } from "../../utils/axiosConfig";
import { jwtDecode } from "jwt-decode";

// export const isTokenExpired = (token) => {
//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp < currentTime;
//   } catch (error) {
//     console.log(error);
//     return true;
//   }
// };

export const login = (data) => async (dispatch) => {
  try {
    const response = await authInstance.post("/login", data);
    const { user, token } = response.data;

    localStorage.setItem("token", token);

    dispatch({
      type: "LOGIN",
      payload: { user, token },
    });

    return { success: true };
  } catch(error) {
    console.log(error);
    return {
      success: false,
      message: error.response.data.message,
      info: error.response.data.info,
    }
  }
};

export const loginGoogle = (token) => async (dispatch) => {
  try {
    const user = jwtDecode(token);
    localStorage.setItem("token", token);

    dispatch({
      type: "LOGIN",
      payload: { user, token },
    });

    return { success: true };
  } catch(error) {
    console.log(error);
    return {
      success: false,
      message: error.response.data.message,
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    await authInstance.post("/logout");
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  } catch(error) {
    console.log(error);
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await authInstance.post("/forgot-password", { email });
    dispatch({
      type: "FORGOT_PASSWORD_SUCCESS",
      payload: response.data.message,
    });

    return { success: true };
  } catch(error) {
    console.log(error);
    dispatch({
      type: "FORGOT_PASSWORD_ERROR",
      payload: error.response.data.message,
    });
    return {
      success: false,
      message: error.response.data.message,
    }
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    const response = await authInstance.post(`/reset-password/${token}`, { password });
    dispatch({
      type: "RESET_PASSWORD_SUCCESS",
      payload: response.data.message,
    });
    return { success: true };
  } catch(error) {
    console.log(error);
    dispatch({
      type: "RESET_PASSWORD_FAILURE",
      payload: error.response.data.message,
    });
    return {
      success: false,
      message: error.response.data.message,
    }
  }
}

export const googleLogin = () => async dispatch => {
  try {
    window.location.href = 'http://localhost:3001/api/auth/google';
  } catch(error) {
    console.log(error);
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    throw error;
  }
};