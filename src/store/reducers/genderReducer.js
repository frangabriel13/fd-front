const initialState = {
  genders : [],
  error: null,
  gender: null,
};

const genderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GENDERS":
      return {
        ...state,
        genders: action.payload,
      };
    default:
      return state;
  }
}


export default genderReducer;