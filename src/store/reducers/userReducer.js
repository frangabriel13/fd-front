const initialState = {
  user: null,
  loading: false,
  error: null,
  isVerified: false,
  followed: [],
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
    case 'UPDATE_USER_WHOLESALER':
      return {
        ...state,
        user: {
          ...state.user,
          wholesaler: action.payload,
        },
      };
    case 'GET_FOLLOWED_MANUFACTURERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_FOLLOWED_MANUFACTURERS_SUCCESS':
      return {
        ...state,
        followed: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_FOLLOWED_MANUFACTURERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'FOLLOW_MANUFACTURER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FOLLOW_MANUFACTURER_SUCCESS':
      return {
        ...state,
        followed: [...state.followed, action.payload],
        loading: false,
        error: null,
      };
    case 'FOLLOW_MANUFACTURER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'UNFOLLOW_MANUFACTURER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'UNFOLLOW_MANUFACTURER_SUCCESS':
      return {
        ...state,
        followed: state.followed.filter(manufacturer => manufacturer.id !== action.payload.id),
        loading: false,
        error: null,
      };
    case 'UNFOLLOW_MANUFACTURER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};


export default userReducer;