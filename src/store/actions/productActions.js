import { productInstance } from "../../utils/axiosConfig";

export const getProducts = (page = 1, pageSize = 20) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_REQUEST' });
  try {
    const response = await productInstance.get('/', {
      params: {
        page,
        pageSize,
      }
    });
    dispatch({
      type: 'GET_PRODUCTS_SUCCESS',
      payload: {
        products: response.data.products,
        currentPage: page,
        pageSize: pageSize,
        totalProducts: response.data.totalProducts,
      }
    });
  } catch(error) {
    dispatch({
      type: 'GET_PRODUCTS_FAILURE',
      error: error.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  dispatch({ type: 'CREATE_PRODUCT_REQUEST' });
  try {
    const response = await productInstance.post('/', productData);
    dispatch({
      type: 'CREATE_PRODUCT_SUCCESS',
      payload: response.data
    });
    dispatch({ type: 'CLEAR_IMAGES' });
  } catch(error) {
    dispatch({
      type: 'CREATE_PRODUCT_FAILURE',
      error: error.message,
    });
    dispatch({ type: 'CLEAR_IMAGES' });
  }
};

export const getProductsByUserId = () => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_BY_USER_REQUEST' });
  try {
    const response = await productInstance.get('/createdbyMe');
    dispatch({
      type: 'GET_PRODUCTS_BY_USER_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'GET_PRODUCTS_BY_USER_FAILURE',
      error: error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_REQUEST' });
  try {
    await productInstance.delete(`/${productId}`);
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', payload: productId });
  } catch(error) {
    dispatch({
      type: 'DELETE_PRODUCT_FAILURE',
      error: error.message,
    });
  }
};