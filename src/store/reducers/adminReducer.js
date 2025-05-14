const initialState = {
  manufacturers: [],
  loading: false,
  error: null,
}

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        manufacturers: action.payload,
        loading: false,
      }
    case "DELETE_USER":
      return {
        ...state,
        manufacturers: state.manufacturers.filter(user => user.id !== action.payload),
      }
    case "UPDATE_MANUFACTURER":
      return {
        ...state,
        manufacturers: state.manufacturers.map(manufacturer =>
          manufacturer.id === action.payload.id ? action.payload : manufacturer
        ),
      }
    case "VERIFY_USER":
      return {
        ...state,
        manufacturers: state.manufacturers.map(user =>
          user.id === action.payload.id ? { ...user, verified: true } : user
        ),
      }
    case "LOADING":
      return {
        ...state,
        loading: true,
      }
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}


export default adminReducer;