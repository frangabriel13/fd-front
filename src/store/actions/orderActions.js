import { orderInstance } from "../../utils/axiosConfig";

export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: 'CREATE_ORDER_REQUEST' });
  try {
    const response = await orderInstance.post('/', orderData);
    console.log('Order created successfully:', response.data);
    dispatch({
      type: 'CREATE_ORDER_SUCCESS',
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAILURE',
      error: error.message,
    });
  }
};

export const getMySubOrders = () => async (dispatch) => {
  console.log('Fetching my suborders...');
  dispatch({ type: 'GET_MY_SUBORDERS_REQUEST' });
  try {
    const response = await orderInstance.get('/my-suborders');
    console.log('My suborders fetched successfully:', response.data);
    dispatch({
      type: 'GET_MY_SUBORDERS_SUCCESS',
      payload: response.data,
    });
  }
  catch(error) {
    dispatch({
      type: 'GET_MY_SUBORDERS_FAILURE',
      error: error.message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  dispatch({ type: 'GET_MY_ORDERS_REQUEST' });
  try {
    const response = await orderInstance.get('/my-orders');
    console.log('My orders fetched successfully:', response.data);
    dispatch({
      type: 'GET_MY_ORDERS_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_MY_ORDERS_FAILURE',
      error: error.message,
    });
  }
}

export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: 'DELETE_ORDER_REQUEST' });
  try {
    const response = await orderInstance.delete(`/${orderId}`);
    console.log('Order deleted successfully:', response.data);
    dispatch({
      type: 'DELETE_ORDER_SUCCESS',
      payload: orderId,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_ORDER_FAILURE',
      error: error.message,
    });
  }
};

export const getUnifiedOrders = (page = 1, limit = 15) => async (dispatch) => {
  dispatch({ type: 'GET_UNIFIED_ORDERS_REQUEST' });
  try {
    const response = await orderInstance.get('/unified' , {
      params: { page, limit },
    });

    const { unifiedOrders, total, totalPages } = response.data;

    dispatch({
      type: 'GET_UNIFIED_ORDERS_SUCCESS',
      payload: { unifiedOrders, total, totalPages, page },
    });
  } catch(error) {
    dispatch({
      type: 'GET_UNIFIED_ORDERS_FAILURE',
      error: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: 'GET_ORDER_BY_ID_REQUEST' });
  try {
    const response = await orderInstance.get(`/${orderId}`);
    console.log('Order fetched successfully:', response.data);
    dispatch({
      type: 'GET_ORDER_BY_ID_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ORDER_BY_ID_FAILURE',
      error: error.message,
    });
  }
};