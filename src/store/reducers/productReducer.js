const initialState = {
  products: [],
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
    default:
      return state;
  }
};