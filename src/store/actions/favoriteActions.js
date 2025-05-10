import { favoriteInstance } from "../../utils/axiosConfig";

// Obtener favoritos
export const getFavorites = () => async (dispatch) => {
  dispatch({ type: 'GET_FAVORITES_REQUEST' });
  try {
    const response = await favoriteInstance.get('/');
    dispatch({
      type: 'GET_FAVORITES_SUCCESS',
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: 'GET_FAVORITES_FAILURE',
      error: error.message,
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Agregar un favorito
export const addFavorite = (productId) => async (dispatch) => {
  dispatch({ type: 'ADD_FAVORITE_REQUEST' });
  try {
    const response = await favoriteInstance.post('/', { productId });
    dispatch({
      type: 'ADD_FAVORITE_SUCCESS',
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: 'ADD_FAVORITE_FAILURE',
      error: error.message,
    });
    return { success: false, error: error.response?.data || error.message };
  }
};

// Eliminar un favorito
export const deleteFavorite = (productId) => async (dispatch) => {
  dispatch({ type: 'DELETE_FAVORITE_REQUEST' });
  try {
    const response = await favoriteInstance.delete(`/${productId}`);
    dispatch({
      type: 'DELETE_FAVORITE_SUCCESS',
      payload: response.data,
    });
    return { success: true, data: response.data };
  } catch (error) {
    dispatch({
      type: 'DELETE_FAVORITE_FAILURE',
      error: error.message,
    });
    return { success: false, error: error.response?.data || error.message };
  }
};