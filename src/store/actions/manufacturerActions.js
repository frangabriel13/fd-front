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
    dispatch({
      type: 'UPDATE_USER_ROLE',
      payload: 'manufacturer',
    })
  } catch (error) {
    dispatch({
      type: 'CREATE_MANUFACTURER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};

export const uploadManufacturerImages = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPLOAD_MANUFACTURER_IMAGES_REQUEST' });
  try {
    const response = await manufacturerInstance.post(`/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({
      type: 'UPLOAD_MANUFACTURER_IMAGES_SUCCESS',
      payload: response.data.images,
    });
  } catch (error) {
    dispatch({
      type: 'UPLOAD_MANUFACTURER_IMAGES_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};

export const updateManufacturer = (id, manufacturerData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_MANUFACTURER_REQUEST' });
  try {
    const response = await manufacturerInstance.put(`/${id}`, manufacturerData);
    dispatch({
      type: 'UPDATE_MANUFACTURER',
      payload: response.data,
    });
    dispatch({
      type: 'UPDATE_USER_MANUFACTURER',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_MANUFACTURER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};