const initialState = {
  items: [],
  products: [],
  total: 0,
}

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CART_UPDATE_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'CART_CLEAR':
      return {
        ...state,
        items: [],
      };
    case 'CART_GET_ITEMS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};


export default cartReducer;