const initialState = {
  products: [],
  myProducts: [],
  currentPage: 1,
  pageSize: 20,
  totalProducts: 0,
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload.products,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        totalProducts: action.payload.totalProducts,
      };
    case 'GET_PRODUCTS_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'GET_PRODUCTS_BY_USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_PRODUCTS_BY_USER_SUCCESS':
      return { ...state, loading: false, error: null, myProducts: action.payload };
    case 'GET_PRODUCTS_BY_USER_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'CREATE_PRODUCT_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CREATE_PRODUCT_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        error: null,
        products: [...state.products, action.payload],
      };
    case 'CREATE_PRODUCT_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};


export default productReducer;