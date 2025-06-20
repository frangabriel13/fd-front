import { manufacturerInstance } from "../../utils/axiosConfig";

export const getManufacturers = (page = 1, pageSize = 1000) => async (dispatch) => {
  dispatch({ type: 'GET_MANUFACTURERS_REQUEST' });
  try {
    const response = await manufacturerInstance.get('/', {
      params: {
        page,
        pageSize,
      },
    });
    dispatch({
      type: 'GET_MANUFACTURERS',
      payload: {
        manufacturers: response.data.manufacturers,
        currentPage: page,
        pageSize,
        totalManufacturers: response.data.totalManufacturers,
      },
    });
  } catch (error) {
    dispatch({
      type: 'GET_MANUFACTURERS_FAILURE',
      error: error.message,
    });
    console.error(error);
  };
};

export const getLiveManufacturers = (page = 1, pageSize = 16) => async (dispatch) => {
  dispatch({ type: 'GET_LIVE_MANUFACTURERS_REQUEST' });
  try {
    const response = await manufacturerInstance.get('/live', {
      params: { page, pageSize },
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
    console.log('Uploading images for manufacturer ID:', id);
    console.log('FormData:', formData);
    // const response = await manufacturerInstance.post(`/${id}/images`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    const response = await manufacturerInstance.post(`/${id}/images`, formData);
    dispatch({
      type: 'UPLOAD_MANUFACTURER_IMAGES_SUCCESS',
      payload: response.data.images,
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    dispatch({
      type: 'UPLOAD_MANUFACTURER_IMAGES_FAILURE',
      error: error.message,
    });
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateManufacturer = (id, manufacturerData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_MANUFACTURER_REQUEST' });
  try {
    const response = await manufacturerInstance.put(`/${id}`, manufacturerData);
    console.log('Update Manufacturer Response:', response.data);
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

export const activateLiveManufacturer = () => async (dispatch) => {
  dispatch({ type: 'ACTIVATE_LIVE_MANUFACTURER_REQUEST' });
  try {
    const response = await manufacturerInstance.put('/activate');
    dispatch({
      type: 'UPDATE_USER_MANUFACTURER',
      payload: response.data.manufacturer,
    });
  } catch(error) {
    dispatch({
      type: 'ACTIVATE_LIVE_MANUFACTURER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};

export const addLogoToManufacturer = (id, formData) => async (dispatch) => {
  dispatch({ type: 'ADD_LOGO_TO_MANUFACTURER_REQUEST' });
  try {
    const response = await manufacturerInstance.put(`/logo/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({
      type: 'ADD_LOGO_TO_MANUFACTURER_SUCCESS',
      payload: response.data.image,
    });
  } catch(error) {
    dispatch({
      type: 'ADD_LOGO_TO_MANUFACTURER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};

export const getManufacturerByUserId = (userId) => async (dispatch) => {
  dispatch({ type: 'GET_MANUFACTURER_BY_USER_REQUEST' });
  try {
    const response = await manufacturerInstance.get(`/${userId}`);
    dispatch({
      type: 'GET_MANUFACTURER_BY_USER_SUCCESS',
      payload: response.data,
    });
  } catch(error) {
    dispatch({
      type: 'GET_MANUFACTURER_BY_USER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};

export const refreshToken = async () => {
  try {
    console.log('Refreshing token...');
    const response = await manufacturerInstance.post('/refresh-token');
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const clearManufacturer = () => (dispatch) => {
  dispatch({ type: 'CLEAR_MANUFACTURER' });
};