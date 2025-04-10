const initialState = {
  items: [],
  total: 0,
}

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CART_UPDATE_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};


export default cartReducer;