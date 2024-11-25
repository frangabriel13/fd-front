const initialState = {
  liveManufacturers: [],
  loading: false,
  error: null,
}

const manufacturerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIVE_MANUFACTURERS':
      return {
        ...state,
        liveManufacturers: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_LIVE_MANUFACTURERS_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'GET_LIVE_MANUFACTURERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export default manufacturerReducer;