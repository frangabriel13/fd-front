const initialState = {
  user: null,
  loading: false,
  error: null,
  isVerified: false,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'REGISTER_USER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'VERIFY_EMAIL_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'VERIFY_EMAIL_SUCCESS':
      return {
        ...state,
        isVerified: true,
        loading: false,
        error: null,
      };
    case 'VERIFY_EMAIL_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'GET_ME_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_ME_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
        error: null,
      };
    case 'GET_ME_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'UPDATE_USER_MANUFACTURER':
      return {
        ...state,
        user: {
          ...state.user,
          manufacturer: action.payload,
        },
      };
    default:
      return state;
  }
};


export default userReducer;