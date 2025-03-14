import { productInstance } from "../../utils/axiosConfig";

export const getProducts = (page = 1, pageSize = 24, filters = {}) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_REQUEST' });
  try {
    const response = await productInstance.get('/', {
      params: {
        page,
        pageSize,
        ...filters,
      }
    });
    console.log('response: ', response.data);
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

export const searchProducts = (page = 1, pageSize = 18, search) => async (dispatch) => {
  dispatch({ type: 'SEARCH_PRODUCTS_REQUEST' });
  try {
    const response = await productInstance.get('/search', {
      params: {
        page,
        pageSize,
        search,
      }
    });
    dispatch({
      type: 'SEARCH_PRODUCTS_SUCCESS',
      payload: {
        products: response.data.products,
        currentPage: page,
        pageSize: pageSize,
        totalProducts: response.data.totalProducts,
      }
    });
  } catch(error) {
    dispatch({
      type: 'SEARCH_PRODUCTS_FAILURE',
      error: error.message,
    })
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

export const getProductsByUserId = (page = 1, pageSize = 10) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_BY_USER_REQUEST' });
  try {
    const response = await productInstance.get('/createdbyMe', {
      params: {
        page,
        pageSize,
      }
    });
    console.log(response.data);
    dispatch({
      type: 'GET_PRODUCTS_BY_USER_SUCCESS',
      // payload: response.data
      payload: {
        myProducts: response.data.myProducts,
        currentPage: page,
        pageSize: pageSize,
        myTotalProducts: response.data.myTotalProducts,
      }
    });
  } catch(error) {
    dispatch({
      type: 'GET_PRODUCTS_BY_USER_FAILURE',
      error: error.message,
    });
  }
};

export const getProductsByManufacturer = (userId, page = 1, pageSize = 18, sortOrder = 'newest') => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_BY_MANUFACTURER_REQUEST' });
  try {
    const response = await productInstance.get(`/manufacturer/${userId}`, {
      params: {
        page,
        pageSize,
        sortOrder,
      }
    });
    dispatch({
      type: 'GET_PRODUCTS_BY_MANUFACTURER_SUCCESS',
      payload: {
        products: response.data.products,
        currentPage: page,
        pageSize: pageSize,
        totalProducts: response.data.totalProducts,
      }
    });
  } catch(error) {
    dispatch({
      type: 'GET_PRODUCTS_BY_MANUFACTURER_FAILURE',
      error: error.message,
    });
  }
};

export const getProductById = (productId) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCT_BY_ID_REQUEST' });
  try {
    const response = await productInstance.get(`/${productId}`);
    dispatch({
      type: 'GET_PRODUCT_BY_ID_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'GET_PRODUCT_BY_ID_FAILURE',
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

export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_REQUEST' });
  try {
    const response = await productInstance.put(`/${productId}`, productData);
    dispatch({
      type: 'UPDATE_PRODUCT_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'UPDATE_PRODUCT_FAILURE',
      error: error.message,
    });
  }
};

export const getNewProducts = () => async (dispatch) => {
  dispatch({ type: 'GET_NEW_PRODUCTS_REQUEST' });
  try {
    const response = await productInstance.get('/new');
    dispatch({
      type: 'GET_NEW_PRODUCTS_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'GET_NEW_PRODUCTS_FAILURE',
      error: error.message,
    });
  }
};

export const getProductsOnSale = () => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_ON_SALE_REQUEST' });
  try {
    const response = await productInstance.get('/onsale');
    dispatch({
      type: 'GET_PRODUCTS_ON_SALE_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'GET_PRODUCTS_ON_SALE_FAILURE',
      error: error.message,
    });
  }
};

export const getBisuteriaOrBlanqueria = () => async (dispatch) => {
  dispatch({ type: 'GET_BISUTERIA_OR_BLANQUERIA_REQUEST' });
  try {
    const response = await productInstance.get('/bisuteria-or-blanqueria');
    dispatch({
      type: 'GET_BISUTERIA_OR_BLANQUERIA_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'GET_BISUTERIA_OR_BLANQUERIA_FAILURE',
      error: error.message,
    });
  }
};