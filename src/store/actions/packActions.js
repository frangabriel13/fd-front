import { packInstance } from "../../utils/axiosConfig";

export const getPacks = (page = 1, pageSize = 20) => async (dispatch) => {
  dispatch({ type: 'GET_PACKS_REQUEST' });
  try {
    const response = await packInstance.get('/', {
      params: {
        page,
        pageSize,
      }
    });
    dispatch({
      type: 'GET_PACKS_SUCCESS',
      payload: {
        packs: response.data.packs,
        currentPage: page,
        pageSize: pageSize,
        totalPacks: response.data.totalPacks,
      }
    });
  } catch(error) {
    dispatch({
      type: 'GET_PACKS_FAILURE',
      error: error.message,
    });
  }
};

export const getPacksByUserId = (page = 1, pageSize = 10) => async (dispatch) => {
  dispatch({ type: 'GET_PACKS_BY_USER_REQUEST' });
  try {
    const response = await packInstance.get('/createdbyMe', {
      params: {
        page,
        pageSize,
      }
    });
    dispatch({
      type: 'GET_PACKS_BY_USER_SUCCESS',
      payload: {
        packs: response.data.packs,
        currentPage: page,
        pageSize: pageSize,
        totalPacks: response.data.totalPacks,
      }
    });
  } catch(error) {
    dispatch({
      type: 'GET_PACKS_BY_USER_FAILURE',
      error: error.message,
    });
  }
};

export const createPack = (packData) => async (dispatch) => {
  dispatch({ type: 'CREATE_PACK_REQUEST' });
  try {
    const response = await packInstance.post('/', packData);
    dispatch({
      type: 'CREATE_PACK_SUCCESS',
      payload: response.data
    });
    dispatch({ type: 'CLEAR_IMAGES' });
  } catch(error) {
    dispatch({
      type: 'CREATE_PACK_FAILURE',
      error: error.message,
    });
    dispatch({ type: 'CLEAR_IMAGES' });
  }
};

export const deletePack = (packId) => async (dispatch) => {
  dispatch({ type: 'DELETE_PACK_REQUEST' });
  try {
    await packInstance.delete(`/${packId}`);
    dispatch({
      type: 'DELETE_PACK_SUCCESS',
      payload: packId
    });
  } catch(error) {
    dispatch({
      type: 'DELETE_PACK_FAILURE',
      error: error.message,
    });
  }
};

export const updatePack = (packData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PACK_REQUEST' });
  try {
    const response = await packInstance.put(`/${packData.id}`, packData);
    dispatch({
      type: 'UPDATE_PACK_SUCCESS',
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: 'UPDATE_PACK_FAILURE',
      error: error.message,
    });
  }
};