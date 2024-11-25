import { manufacturerInstance } from "../../utils/axiosConfig";

export const getLiveManufacturers = () => async (dispatch) => {
  dispatch({ type: 'GET_LIVE_MANUFACTURERS_REQUEST' });
  try {
    const response = await manufacturerInstance.get('/live');
    dispatch({
      type: 'GET_LIVE_MANUFACTURERS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_LIVE_MANUFACTURERS_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};