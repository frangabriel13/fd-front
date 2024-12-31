const initialState = {
  liveManufacturers: [],
  manufacturers: [],
  loading: false,
  error: null,
};

const manufacturerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIVE_MANUFACTURERS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_LIVE_MANUFACTURERS':
      return {
        ...state,
        liveManufacturers: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_LIVE_MANUFACTURERS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'CREATE_MANUFACTURER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'CREATE_MANUFACTURER':
      return {
        ...state,
        // manufacturers: [...state.manufacturers, action.payload],
        loading: false,
        error: null,
      };
    case 'CREATE_MANUFACTURER_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};


export default manufacturerReducer;