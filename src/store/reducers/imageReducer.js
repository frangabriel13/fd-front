const initialState = {
  images: [],
  loading: false,
  error: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPLOAD_IMAGES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'UPLOAD_IMAGES_SUCCESS':
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case 'UPLOAD_IMAGES_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_IMAGES':
      return {
        ...state,
        images: [],
      };
    default:
      return state;
  }
};


export default imageReducer;