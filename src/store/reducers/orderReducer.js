const initialState = {
  loading: false,
  error: null,
  mySubOrders: [],
  myOrders: [],
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
    default:
      return state;
  }
};


export default orderReducer;