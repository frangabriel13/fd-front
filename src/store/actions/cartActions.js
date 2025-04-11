import { productInstance } from "../../utils/axiosConfig";

export const addToCart = (item, manufacturerId, type) => (dispatch, getState) => {
  //manufacturerId es en realidad el userId del fabricante
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
    item.variations.forEach(variation => {
      const existingProductIndex = manufacturerCart.products.findIndex(
        product => product.productId === item.productId && product.variationId === variation.variationId
      );

      if (existingProductIndex !== -1) {
        manufacturerCart.products[existingProductIndex] = {
          ...manufacturerCart.products[existingProductIndex],
          quantity: manufacturerCart.products[existingProductIndex].quantity + variation.quantity,
        };
      } else {
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

export const getCart = () => async (dispatch, getState) => {
  try{
    // Obtener los elementos del carrito del localStorage
    // const cartItems = JSON.parse(localStorage.getItem('items')) || [];

    // Obtener el estado actual del carrito
    const { cart: { items } } = getState();

    // Construir el payload para enviar al backend
    const payload = items.map(item => ({
      manufacturerId: item.manufacturerId,
      packIds: [...new Set(item.packs.map(pack => pack.packId))], // Eliminar duplicados en packIds
      productIds: [...new Set(item.products.map(product => product.productId))], // Eliminar duplicados en productIds
    }));

    console.log('Payload para el carrito:', payload);
    // const response = await productInstance.post('/cart', payload);

    // dispatch({
    //   type: 'CART_GET_ITEMS',
    //   payload: response.data,
    // });
  } catch(error) {
    console.error('Error al obtener el carrito:', error);
    dispatch({
      type: 'CART_ERROR',
      payload: error.message,
    });
  }
};