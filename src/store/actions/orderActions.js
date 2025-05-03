import { orderInstance } from "../../utils/axiosConfig";

export const createOrder = (orderData) => async (dispatch) => {
  console.log('Creating order with data:', orderData);
  dispatch({ type: 'CREATE_ORDER_REQUEST' });
  try {
    const response = await orderInstance.post('/', orderData);
    console.log('Order created successfully:', response.data);
    dispatch({
      type: 'CREATE_ORDER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAILURE',
      error: error.message,
    });
  }
};

export const getMySubOrders = () => async (dispatch) => {
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