export const addToCart = (item, manufacturerId, type) => (dispatch, getState) => {
  // Obtener el estado actual del carrito
  const { cart: { items } } = getState();

  // Crear una copia inmutable del array de items
  const updatedItems = [...items];

  // Buscar si ya existe un objeto para el fabricante
  let manufacturerCart = updatedItems.find(cart => cart.manufacturerId === manufacturerId);

  if (!manufacturerCart) {
    // Si no existe, crear un nuevo objeto para el fabricante
    manufacturerCart = {
      manufacturerId,
      packs: [],
      products: [],
    };
    updatedItems.push(manufacturerCart);
  } else {
    // Crear una copia inmutable del objeto manufacturerCart
    manufacturerCart = { ...manufacturerCart, packs: [...manufacturerCart.packs], products: [...manufacturerCart.products] };
    const index = updatedItems.findIndex(cart => cart.manufacturerId === manufacturerId);
    updatedItems[index] = manufacturerCart;
  }

  if (type === 'pack') {
    // Si es un pack, agregar o actualizar el pack en el carrito
    const existingPack = manufacturerCart.packs.find(pack => pack.packId === item.packId);
    if (existingPack) {
      existingPack.quantity += item.quantity;
    } else {
      manufacturerCart.packs.push({ packId: item.packId, quantity: item.quantity });
    }
  } else if (type === 'product') {
    // Si es un producto con múltiples variantes, iterar sobre las variantes
    item.variations.forEach(variation => {
      const existingProduct = manufacturerCart.products.find(
        product => product.productId === item.productId && product.variationId === variation.variationId
      );

      if (existingProduct) {
        // Si ya existe la variante, actualizar la cantidad
        existingProduct.quantity += variation.quantity;
      } else {
        // Si no existe, agregar la nueva variante
        manufacturerCart.products.push({
          productId: item.productId,
          variationId: variation.variationId,
          quantity: variation.quantity,
        });
      }
    });
  }

  // Enviar la acción al reducer con el nuevo estado inmutable
  dispatch({
    type: 'CART_UPDATE_ITEMS',
    payload: updatedItems,
  });

  // Guardar los elementos del carrito en localStorage
  localStorage.setItem('cartItems', JSON.stringify(updatedItems));
};