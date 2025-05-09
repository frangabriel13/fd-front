export const nicknameToUrl = (nickname) => {
  return `https://www.tiktok.com/@${nickname}/live`;
};

export const urlToNickname = (url) => {
  return url.split('@')[1].split('/')[0];
};

export const filterCategoriesByParentAndGender = (categories, parentId, genderId) => {
  return categories.filter((category) => 
    category.parentId === parentId && 
    (genderId == null || category.genders.some(gender => gender.id === genderId))
  );
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
};

export const calculateTotalCart = (cart) => {
  if (!cart) return 0;

  // Calcular el total de los packs
  const packsTotal = cart.packs?.reduce((sum, pack) => {
    const packTotal = pack.price * pack.totalItem;
    return sum + packTotal;
  }, 0) || 0;

  // Calcular el total de los productos
  const productsTotal = cart.products?.reduce((sum, product) => {
    const totalItemsInInventories = product.inventories.reduce((inventorySum, inventory) => {
      return inventorySum + inventory.totalItem;
    }, 0);

    return sum + (product.price * totalItemsInInventories);
  }, 0) || 0;

  // Sumar ambos totales
  return packsTotal + productsTotal;
};

export const formatDateAndTime = (isoString) => {
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString('es-AR');
  const formattedTime = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  return { formattedDate, formattedTime };
};

export const contactWspOrder = (manufacturerName, manufacturerPhone, orderId) => {
  console.log('contact WspOrder', manufacturerName, manufacturerPhone, orderId);
  // const message = `Hola, realicé una compra en ${manufacturerName} y quiero consultar sobre la orden #${orderId}.`;
  // const url = `https://api.whatsapp.com/send?phone=${manufacturerPhone}&text=${encodeURIComponent(message)}`;
  // window.open(url, '_blank');
};