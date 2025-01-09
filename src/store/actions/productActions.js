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