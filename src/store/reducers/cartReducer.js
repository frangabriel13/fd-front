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
    case 'CART_UPDATE_MANUFACTURER': {
      console.log('pasa por el reducer');
      const { manufacturerId, packs, products } = action.payload;
      console.log('manufacturerId: ', manufacturerId);

      const updatedItems = state.items.map((cart) => {
        if(cart.manufacturerId === manufacturerId) {
          // Actualizar packs y products del manufacturer correspondiente
          return {
            ...cart,
            packs,
            products,
          };
        }
        return cart; // Dejar los demás manufacturers sin cambios
      });

      return {
        ...state,
        items: updatedItems,
      };
    }
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