import { manufacturerInstance } from "../../utils/axiosConfig";

export const getLiveManufacturers = (limit = 24, offset = 0) => async (dispatch) => {
  dispatch({ type: 'GET_LIVE_MANUFACTURERS_REQUEST' });
  try {
    const response = await manufacturerInstance.get('/live', {
      params: { limit, offset },
    });
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

export const createManufacturer = (manufacturer) => async (dispatch) => {
  dispatch({ type: 'CREATE_MANUFACTURER_REQUEST' });
  try {
    const response = await manufacturerInstance.post('/', manufacturer);
    dispatch({
      type: 'CREATE_MANUFACTURER',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_MANUFACTURER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};