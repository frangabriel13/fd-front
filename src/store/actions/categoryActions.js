import { categoryInstance } from "../../utils/axiosConfig";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await categoryInstance.get("/");
    const categories = response.data;
    dispatch({
      type: "GET_CATEGORIES",
      payload: categories,
    });
  } catch (error) {
    console.log(error);
  }
}