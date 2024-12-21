import { userInstance } from "../../utils/axiosConfig";
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
    const response = await userInstance.post("/login", data);
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

export const logout = () => async (dispatch) => {
  try {
    await userInstance.post("/logout");
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  } catch(error) {
    console.log(error);
  }
};