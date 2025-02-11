import { getManufacturerByUserId } from "./manufacturerActions";
import { getProductsByManufacturer } from "./productActions";

export const getUserData = (userId, page = 1, pageSize = 15) => async (dispatch) => {
  try {
    await Promise.all([
      dispatch(getManufacturerByUserId(userId)),
      dispatch(getProductsByManufacturer(userId, page, pageSize)),
    ]);
  } catch(error) {
    console.log('Error loading user data:', error);
  }
};