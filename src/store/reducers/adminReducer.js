const initialState = {
  manufacturers: [],
  total: 0,
  totalPages: 1,
  page: 1,
  loading: false,
  error: null,
}

const adminReducer = (state = initialState, action) => {
  switch(action.type) {
    case "GET_ALL_USERS":
      return {
        ...state,
        manufacturers: action.payload.users,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
        loading: false,
      }
    case "DELETE_MANUFACTURERUSER":
      return {
        ...state,
        manufacturers: state.manufacturers.filter(user => user.id !== action.payload),
      }
    case "UPDATE_MANUFACTURERUSER":
      return {
        ...state,
        manufacturers: state.manufacturers.map(user =>
          user.manufacturer.id === action.payload.id
            ? { ...user, manufacturer: action.payload }
            : user
        ),
      }
    case "VERIFY_USER":
      return {
        ...state,
        manufacturers: state.manufacturers.map(user =>
          user.manufacturer.id === action.payload.id
            ? { ...user, manufacturer: action.payload, verified: true }
            : user
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