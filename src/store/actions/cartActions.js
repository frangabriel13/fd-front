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

export const getCart = () => async (dispatch, getState) => {
  try {
    // Obtener los elementos del carrito desde el estado global
    const { cart: { items } } = getState();

    // Enviar los items directamente al backend
    const response = await productInstance.post('/cart', items);
    console.log('items', items);

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

export const updateCart = (payload) => (dispatch, getState) => {
  console.log('payload: ', payload);
  // const { cart: { items } } = getState();

  // const updatedItems = [...items];
  // // const manufacturerCart = updatedItems.find(cart => cart.manufacturerId === manufacturerId);
  // const manufacturerCartIndex = updatedItems.findIndex(cart => cart.manufacturerId === manufacturerId);

  // if (manufacturerCartIndex === -1) {
  //   console.error(`Manufacturer with ID ${manufacturerId} not found in the cart.`);
  //   return;
  // }

  // const manufacturerCart = { ...updatedItems[manufacturerCartIndex] };

  // if (updates.packs) {
  //   updates.packs.forEach(update => {
  //     const packIndex = manufacturerCart.packs.findIndex(pack => pack.packId === update.packId);

  //     if (packIndex !== -1) {
  //       if (update.quantity !== undefined) {
  //         // Actualizar cantidad del pack
  //         manufacturerCart.packs[packIndex].quantity = update.quantity;
  //       } else if (update.remove) {
  //         // Eliminar el pack
  //         manufacturerCart.packs.splice(packIndex, 1);
  //       }
  //     }
  //   });
  // }

  // if (updates.products) {
  //   updates.products.forEach(update => {
  //     const productIndex = manufacturerCart.products.findIndex(product => product.productId === update.productId);

  //     if (productIndex !== -1) {
  //       if (update.variations) {
  //         const product = { ...manufacturerCart.products[productIndex] };
  //         product.variations = product.variations.filter(variation => {
  //           const variationUpdate = update.variations.find(v => v.variationId === variation.variationId);
  //           if (variationUpdate) {
  //             if (variationUpdate.quantity !== undefined) {
  //               variation.quantity = variationUpdate.quantity;
  //             }
  //             return !variationUpdate.remove;
  //           }
  //           return true;
  //         });
  //         manufacturerCart.products[productIndex] = product;
  //       }

  //       if (update.remove) {
  //         // Eliminar el producto
  //         manufacturerCart.products.splice(productIndex, 1);
  //       }
  //     }
  //   });
  // }

  // updatedItems[manufacturerCartIndex] = manufacturerCart;

  // dispatch({
  //   type: 'CART_UPDATE_ITEMS',
  //   payload: updatedItems,
  // });
  
  // localStorage.setItem('cartItems', JSON.stringify(updatedItems));
};