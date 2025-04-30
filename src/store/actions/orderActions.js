import { orderInstance } from "../../utils/axiosConfig";

export const createOrder = (orderData) => async (dispatch) => {
  console.log('Creating order with data:', orderData);
  dispatch({ type: 'CREATE_ORDER_REQUEST' });
  try {
    const response = await orderInstance.post('/', orderData);
    console.log('Order created successfully:', response.data);
    // dispatch({
    //   type: 'CREATE_ORDER_SUCCESS',
    //   payload: response.data,
    // });
  } catch (error) {
    dispatch({
      type: 'CREATE_ORDER_FAILURE',
      error: error.message,
    });
  }
};