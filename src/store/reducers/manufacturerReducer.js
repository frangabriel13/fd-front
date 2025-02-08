const initialState = {
  liveManufacturers: [],
  manufacturers: [],
  manufacturer: {},
  loading: false,
  error: null,
  uploadedImages: {},
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
    case 'GET_MANUFACTURER_BY_USER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'GET_MANUFACTURER_BY_USER_SUCCESS':
      return {
        ...state,
        manufacturer: action.payload,
        loading: false,
        error: null,
      };
    case 'GET_MANUFACTURER_BY_USER_FAILURE':
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
    case 'UPLOAD_MANUFACTURER_IMAGES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'UPLOAD_MANUFACTURER_IMAGES_SUCCESS':
      return {
        ...state,
        loading: false,
        uploadedImages: action.payload,
      };
    case 'UPLOAD_MANUFACTURER_IMAGES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'UPDATE_MANUFACTURER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'UPDATE_MANUFACTURER':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'UPDATE_MANUFACTURER_SUCCESS':
      return {
        ...state,
        loading: false,
        manufacturers: state.manufacturers.map(manufacturer =>
          manufacturer.id === action.payload.id ? action.payload : manufacturer
        ),
      };
    case 'ADD_LOGO_TO_MANUFACTURER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ADD_LOGO_TO_MANUFACTURER_SUCCESS':
      return {
        ...state,
        loading: false,
        manufacturers: state.manufacturers.map(manufacturer =>
          // manufacturer.id === action.payload.id ? action.payload : manufacturer
          manufacturer.id === action.payload.id
            ? { ...manufacturer, image: action.payload.image }
            : manufacturer
        ),
      };
    case 'ADD_LOGO_TO_MANUFACTURER_FAILURE':
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