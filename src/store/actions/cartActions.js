export const addToCart = (item, manufacturerId, type) => (dispatch, getState) => {
  // Obtener el estado actual del carrito
  const { cart: { items } } = getState();

  // Buscar si ya existe un objeto para el fabricante
  let manufacturerCart = items.find(cart => cart.manufacturerId === manufacturerId);

  if(!manufacturerCart) {
    // Si no existe, crear un nuevo objeto para el fabricante
    manufacturerCart = {
      manufacturerId,
      packs: [],
      products: [],
    };
    items.push(manufacturerCart);
  }

  if(type === 'pack') {
      // Si es un pack, agregar o actualizar el pack en el carrito
      const existingPack = manufacturerCart.packs.find(pack => pack.packId === item.packId);
      if(existingPack) {
        existingPack.quantity += item.quantity;
      } else {
        manufacturerCart.packs.push({ packId: item.packId, quantity: item.quantity });
      }
  } else if(type === 'product') {
      // Si es un producto, agregar o actualizar el producto en el carrito
      const existingProduct = manufacturerCart.products.find(product => product.productId === item.productId && product.variationId === item.variationId);
      if (existingProduct) {
        existingProduct.quantity += item.quantity;
      } else {
        manufacturerCart.products.push({
          productId: item.productId,
          variationId: item.variationId,
          quantity: item.quantity,
        });
      }
  }

  // Enviar la acción al reducer
  dispatch({
      type: 'CART_UPDATE_ITEMS',
      payload: items,
  });

  // Guardar los elementos del carrito en localStorage
  localStorage.setItem('cartItems', JSON.stringify(items));
};