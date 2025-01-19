import { colorInstance } from "../../utils/axiosConfig";

export const getColors = () => async (dispatch) => {
  try {
    const response = await colorInstance.get("/");
    const colors = response.data;
    dispatch({
      type: "GET_COLORS",
      payload: colors,
    });
  } catch(error) {
    console.log(error);
  }
}