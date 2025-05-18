import { reviewInstance } from "../../utils/axiosConfig";

// Crear una reseña
export const createReview = (manufacturerId, reviewData) => async (dispatch) => {
  dispatch({ type: 'CREATE_REVIEW_REQUEST' });
  try {
    const response = await reviewInstance.post(`/${manufacturerId}`, reviewData);
    dispatch({
      type: 'CREATE_REVIEW_SUCCESS',
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: 'CREATE_REVIEW_FAILURE',
      error: error.message,
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Actualizar una reseña
export const updateReview = (id, reviewData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_REVIEW_REQUEST' });
  try {
    const response = await reviewInstance.put(`/${id}`, reviewData);
    dispatch({
      type: 'UPDATE_REVIEW_SUCCESS',
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: 'UPDATE_REVIEW_FAILURE',
      error: error.message,
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Eliminar una reseña
export const deleteReview = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_REVIEW_REQUEST' });
  try {
    const response = await reviewInstance.delete(`/${id}`);
    dispatch({
      type: 'DELETE_REVIEW_SUCCESS',
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: 'DELETE_REVIEW_FAILURE',
      error: error.message,
    });
    return { success: false, error: error.response?.data || error.message };
  }
};