const initialState = {
  loading: false,
  error: null,
  mySubOrders: [],
  myOrders: [],

  unifiedOrders: [],
  total: 0,
  totalPages: 1,
  page: 1,

  selectedOrder: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MY_SUBORDERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_MY_SUBORDERS_SUCCESS':
      return { ...state, loading: false, mySubOrders: action.payload };
    case 'GET_MY_SUBORDERS_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'GET_MY_ORDERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_MY_ORDERS_SUCCESS':
      return { ...state, loading: false, myOrders: action.payload };
    case 'GET_MY_ORDERS_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'CREATE_ORDER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'CREATE_ORDER_SUCCESS':
      return { ...state, loading: false, myOrders: [...state.myOrders, action.payload] };
    case 'CREATE_ORDER_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'DELETE_ORDER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'DELETE_ORDER_SUCCESS':
      return { ...state, loading: false, myOrders: state.myOrders.filter(order => order.id !== action.payload) };
    case 'DELETE_ORDER_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'GET_UNIFIED_ORDERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'GET_UNIFIED_ORDERS_SUCCESS':
      return {
        ...state,
        loading: false,
        unifiedOrders: action.payload.unifiedOrders,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
      };
    case 'GET_UNIFIED_ORDERS_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'GET_ORDER_BY_ID_REQUEST':
      return { ...state, loading: true, error: null, selectedOrder: null };
    case 'GET_ORDER_BY_ID_SUCCESS':
      return { ...state, loading: false, selectedOrder: action.payload };
    case 'GET_ORDER_BY_ID_FAILURE':
      return { ...state, loading: false, error: action.error, selectedOrder: null };
    default:
      return state;
  }
};


export default orderReducer;