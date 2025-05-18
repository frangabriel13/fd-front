const initialState = {
  sizes: [],
  error: null,
};

const sizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SIZES":
      return {
        ...state,
        sizes: action.payload,
      };
    default:
      return state;
  }
};


export default sizeReducer;