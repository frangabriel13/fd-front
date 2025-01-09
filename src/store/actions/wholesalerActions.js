import { wholesalerInstance } from "../../utils/axiosConfig";

export const createWholesaler = (wholesaler) => async (dispatch) => {
  dispatch({ type: 'CREATE_WHOLESALER_REQUEST' });
  try {
    const response = await wholesalerInstance.post('/', wholesaler);
    dispatch({
      type: 'CREATE_WHOLESALER',
      payload: response.data,
    });
    dispatch({
      type: 'UPDATE_USER_ROLE',
      payload: 'wholesaler',
    })
  } catch(error) {
    dispatch({
      type: 'CREATE_WHOLESALER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};