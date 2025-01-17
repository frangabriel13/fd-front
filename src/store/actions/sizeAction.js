import { sizeInstance } from "../../utils/axiosConfig";

export const getSizes = () => async (dispatch) => {
  try {
    const res = await sizeInstance.get("/");
    dispatch({ type: "GET_SIZES", payload: res.data });
  } catch (error) {
    console.log(error);
  }
};