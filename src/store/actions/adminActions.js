import { adminInstance } from "../../utils/axiosConfig";

export const getAllUsers = (page = 1, limit = 15) => async (dispatch) => {
  try {
    const response = await adminInstance.get("/", {
      params: { page, limit },
    });
    const { users, total, totalPages } = response.data;
    dispatch({
      type: "GET_ALL_USERS",
      payload: { users, total, totalPages, page },
    });
  } catch(error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await adminInstance.delete(`/${id}`);
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateManufacturer = (id, data) => async (dispatch) => {
  try {
    const response = await adminInstance.put(`/${id}`, data);
    const updatedManufacturer = response.data;
    dispatch({
      type: "UPDATE_MANUFACTURER",
      payload: updatedManufacturer,
    });
  } catch(error) {
    console.log(error);
  }
};

export const verifyUser = (id) => async (dispatch) => {
  try {
    const response = await adminInstance.put(`/verify/${id}`);
    const verifiedUser = response.data;
    dispatch({
      type: "VERIFY_USER",
      payload: verifiedUser,
    });
  } catch (error) {
    console.log(error);
  }
}