import { orderInstance } from "../../utils/axiosConfig";

export const createOrder = (orderData) => async (dispatch) => {
  console.log('orderData', orderData);
  // dispatch({ type: 'CREATE_ORDER_REQUEST' });
  // try {
  //   const response = await orderInstance.post('/', orderData);
  //   dispatch({
  //     type: 'CREATE_ORDER_SUCCESS',
  //     payload: response.data,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: 'CREATE_ORDER_FAILURE',
  //     error: error.message,
  //   });
  // }
};