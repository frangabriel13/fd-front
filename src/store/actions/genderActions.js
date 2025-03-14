import { genderInstance } from "../../utils/axiosConfig";

export const fethGenders = () => async (dispatch) => {
  try {
    const response = await genderInstance.get("/");
    const genders = response.data;
    dispatch({
      type: "GET_GENDERS",
      payload: genders,
    });
  } catch(error) {
    console.log(error);
  }
}