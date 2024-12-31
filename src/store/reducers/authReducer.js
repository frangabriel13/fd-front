const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "LOGIN_GOOGLE":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      }
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        error: null,
        token: action.payload.token,
      }
    case "FORGOT_PASSWORD_ERROR":
      return {
        ...state,
        error: action.payload,
        token: null,
      }
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        error: null,
      }
    case "RESET_PASSWORD_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    case "UPDATE_USER_ROLE":
      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload,
        }
      }
    default:
      return state;
  }
}


export default authReducer;