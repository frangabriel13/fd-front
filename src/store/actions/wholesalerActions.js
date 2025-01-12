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

export const updateWholesaler = (id, wholesalerData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_WHOLESALER_REQUEST' });
  try {
    const response = await wholesalerInstance.put(`/${id}`, wholesalerData);
    dispatch({
      type: 'UPDATE_WHOLESALER',
      payload: response.data,
    });
    dispatch({
      type: 'UPDATE_USER_WHOLESALER',
      payload: response.data,
    });
  } catch(error) {
    dispatch({
      type: 'UPDATE_WHOLESALER_FAILURE',
      error: error.message,
    });
    console.error(error);
  }
};