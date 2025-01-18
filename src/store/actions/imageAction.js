import { imageInstance } from "../../utils/axiosConfig";

export const uploadImages = (images) => async (dispatch) => {
  try {
    dispatch({ type: 'UPLOAD_IMAGES_REQUEST' });
    
    const { data } = await imageInstance.post('/', images);

    dispatch({ type: 'UPLOAD_IMAGES_SUCCESS', payload: data });
  } catch(error) {
    dispatch({ type: 'UPLOAD_IMAGES_FAIL', payload: error.message });
  }
};