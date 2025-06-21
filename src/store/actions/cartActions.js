import { productInstance } from "../../utils/axiosConfig";

export const addToCart = (item, manufacturerId, type) => (dispatch, getState) => {
  const { cart: { items } } = getState();
  
  const updatedItems = [...items];
  
  let manufacturerCart = updatedItems.find(cart => cart.manufacturerId === manufacturerId);

  if (!manufacturerCart) {
    manufacturerCart = {
      manufacturerId,
      packs: [],
      products: [],
    };
    updatedItems.push(manufacturerCart);
  } else {
    manufacturerCart = { ...manufacturerCart, packs: [...manufacturerCart.packs], products: [...manufacturerCart.products] };
    const index = updatedItems.findIndex(cart => cart.manufacturerId === manufacturerId);
    updatedItems[index] = manufacturerCart;
  }

  if (type === 'pack') {
    const existingPackIndex = manufacturerCart.packs.findIndex(pack => pack.packId === item.packId);
    if (existingPackIndex !== -1) {
      manufacturerCart.packs[existingPackIndex] = {
        ...manufacturerCart.packs[existingPackIndex],
        quantity: manufacturerCart.packs[existingPackIndex].quantity + item.quantity,
      };
    } else {
      manufacturerCart.packs.push({ packId: item.packId, quantity: item.quantity });
    }
  } else if (type === 'product') {
    const existingProductIndex = manufacturerCart.products.findIndex(product => product.productId === item.productId);
    
    if (existingProductIndex !== -1) {
      // Si el producto ya existe, actualizar las variaciones
      const existingProduct = manufacturerCart.products[existingProductIndex];
      const updatedVariations = existingProduct.variations.map(variation => {
        const existingVariation = item.variations.find(v => v.variationId === variation.variationId);
        if (existingVariation) {
          return {
            ...variation,
            quantity: variation.quantity + existingVariation.quantity,
          };
        }
        return variation;
      });

      // Agregar nuevas variaciones que no existan
      item.variations.forEach(variation => {
        if (!updatedVariations.find(v => v.variationId === variation.variationId)) {
          updatedVariations.push({ variationId: variation.variationId, quantity: variation.quantity });
        }
      });
      
      manufacturerCart.products[existingProductIndex] = {
        ...existingProduct,
        variations: updatedVariations,
      };
    } else {
      // Si el producto no existe, agregarlo con sus variaciones
      manufacturerCart.products.push({
        productId: item.productId,
        variations: item.variations.map(variation => ({
          variationId: variation.variationId,
          quantity: variation.quantity,
        })),
      });
    }
  }
  
  dispatch({
    type: 'CART_UPDATE_ITEMS',
    payload: updatedItems,
  });
  
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
};

export const updateCart = (payload) => (dispatch) => {
  dispatch({
    type: 'CART_UPDATE_MANUFACTURER',
    payload,
  });
};

export const getCart = () => async (dispatch, getState) => {
  try {
    // Obtener los elementos del carrito desde el estado global
    const { cart: { items } } = getState();

    // Enviar los items directamente al backend
    const response = await productInstance.post('/cart', items);

    dispatch({
      type: 'CART_GET_ITEMS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    dispatch({
      type: 'CART_ERROR',
      payload: error.message,
    });
  }
};

export const clearCart = () => (dispatch) => {
  // Limpiar el carrito en el estado global
  dispatch({
    type: 'CART_CLEAR',
  });

  // Limpiar el carrito en localStorage
  localStorage.removeItem('cartItems');
};

export const deleteCart = (manufacturerId) => (dispatch, getState) => {
  const { cart: { items } } = getState();
  
  const updatedItems = items.filter(cart => cart.manufacturerId !== manufacturerId);
  
  dispatch({
    type: 'CART_UPDATE_ITEMS',
    payload: updatedItems,
  });
  
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
};

export const editDataCart = (dataUser) => (dispatch) => {
  dispatch({
    type: 'CART_EDIT_DATA',
    payload: dataUser,
  });
};