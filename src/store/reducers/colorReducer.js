const initialState = {
  colors: [],
  color: null,
  error: null,
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COLORS":
      return {
        ...state,
        colors: action.payload,
      };
    default:
      return state;
  }
};


export default colorReducer;