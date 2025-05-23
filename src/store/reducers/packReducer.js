const initialState = {
  loading: false,
  error: null,
  packs: [],
  pack: null,
  myPacks: [],
  newPacks: [],
  currentPage: 1,
  pageSize: 20,
  myCurrentPage: 1,
  myPageSize: 10,
  totalPacks: 0,
  myTotalPacks: 0,
};

const packReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PACKS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_PACKS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        packs: action.payload.packs,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        totalPacks: action.payload.totalPacks,
      };
    case 'GET_PACKS_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'GET_PACKS_BY_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_PACKS_BY_USER_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null, 
        myPacks: action.payload.packs,
        myCurrentPage: action.payload.currentPage,
        myPageSize: action.payload.pageSize,
        myTotalPacks: action.payload.totalPacks,
      };
    case 'GET_PACKS_BY_USER_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'GET_NEW_PACKS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_NEW_PACKS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null,
        newPacks: action.payload,
      };
    case 'GET_NEW_PACKS_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.error,
      };
    case 'GET_PACK_BY_ID_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_PACK_BY_ID_SUCCESS':
      return { ...state, loading: false, error: null, pack: action.payload };
    case 'GET_PACK_BY_ID_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'CREATE_PACK_REQUEST':
      return { 
        ...state, 
        loading: true, 
        error: null,
      };
    case 'CREATE_PACK_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null,
        // packs: [...state.packs, action.payload],
        myPacks: [...state.myPacks, action.payload],
      };
    case 'CREATE_PACK_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.error,
      };
    case 'UPDATE_PACK_REQUEST':
      return { 
        ...state, 
        loading: true, 
        error: null,
      };
    case 'UPDATE_PACK_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null,
        packs: state.packs.map(pack => pack.id === action.payload.id ? action.payload : pack),
        myPacks: state.myPacks.map(pack => pack.id === action.payload.id ? action.payload : pack),
      };
    case 'UPDATE_PACK_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.error,
      };
    case 'DELETE_PACK_REQUEST':
      return { 
        ...state, 
        loading: true, 
        error: null,
      };
    case 'DELETE_PACK_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null,
        packs: state.packs.filter(pack => pack.id !== action.payload),
        myPacks: state.myPacks.filter(pack => pack.id !== action.payload),
      };
    case 'DELETE_PACK_FAILURE':
      return { 
        ...state, 
        loading: false, 
        error: action.error,
      };
    default:
      return state;
  }
};


export default packReducer;