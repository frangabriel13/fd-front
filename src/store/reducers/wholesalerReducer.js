const initialState = {
  wholesalers: [],
  loading: false,
  error: null,
};

const wholesalerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_WHOLESALER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CREATE_WHOLESALER':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'CREATE_WHOLESALER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};


export default wholesalerReducer;