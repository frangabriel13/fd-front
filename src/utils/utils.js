export const nicknameToUrl = (nickname) => {
  return `https://www.tiktok.com/@${nickname}/live`;
};

export const urlToNickname = (url) => {
  return url.split('@')[1].split('/')[0];
};

export const instagramNicknameToUrl = (nickname) => {
  return `https://www.instagram.com/${nickname}/`;
}

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
    const totalItemsInInventories = (product.inventories ?? []).reduce((inventorySum, inventory) => {
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


// Formatea el número de teléfono argentino para WhatsApp
const formatPhoneForWhatsapp = (phone) => {
  let cleanPhone = phone.toString().replace(/\D/g, ''); // Solo números
  if (cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1); // Quita el 0 inicial si existe
  }
  if (!cleanPhone.startsWith('54')) {
    cleanPhone = '54' + cleanPhone; // Agrega el código de país si no está
  }
  return cleanPhone;
};

// Contacta el mayorista al fabricante
export const contactWspOrder = (manufacturerName, manufacturerPhone, orderId) => {
  const phone = formatPhoneForWhatsapp(manufacturerPhone);
  const orderUrl = `${window.location.origin}/orden/${orderId}`;
  const message = `Hola, realicé una compra en ${manufacturerName} y generé la siguiente orden #${orderId}. Podés ver el detalle acá: ${orderUrl}`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Contacta al fabricante al mayorista
export const contactWspBuyer = (buyerName, buyerPhone, manufacturerName, orderId) => {
  const phone = formatPhoneForWhatsapp(buyerPhone);
  const orderUrl = `${window.location.origin}/orden/${orderId}`;
  const message = `Hola ${buyerName}, soy de ${manufacturerName} y quiero contactarte por tu orden #${orderId}. Podés ver el detalle acá: ${orderUrl}`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Contacta el administrador al mayorista
export const contactAdminToWholesaler = (wholesalerName, wholesalerPhone, orderId) => {
  const phone = formatPhoneForWhatsapp(wholesalerPhone);
  const orderUrl = `${window.location.origin}/orden/${orderId}`;
  const message = `Hola ${wholesalerName}, te contactamos de Fabricante Directo. Queremos consultarte por la orden #${orderId}. Podés ver el detalle acá: ${orderUrl}`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Contacta el administrador al fabricante
export const contactAdminToManufacturer = (manufacturerName, manufacturerPhone, orderId) => {
  const phone = formatPhoneForWhatsapp(manufacturerPhone);
  const orderUrl = `${window.location.origin}/orden/${orderId}`;
  const message = `Hola ${manufacturerName}, te contactamos de Fabricante Directo. Queremos consultarte por la orden #${orderId}. Podés ver el detalle acá: ${orderUrl}`;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Contacta el mayorista al fabricante acerca de un producto
export const contactWspProduct = (manufacturerName, manufacturerPhone, productUrl) => {
  const phone = formatPhoneForWhatsapp(manufacturerPhone);
  const message = `Hola ${manufacturerName}, tengo una consulta sobre el siguiente producto ${productUrl}. `;
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// Comparte un enlace o mensaje en WhatsApp permitiendo elegir el contacto
export const shareWspLink = (messageOrUrl) => {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageOrUrl)}`;
  window.open(url, '_blank');
};

export const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} ${years === 1 ? 'año' : 'años'}`;
  if (months > 0) return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  if (days > 0) return `${days} ${days === 1 ? 'día' : 'días'}`;
  if (hours > 0) return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (minutes > 0) return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  return 'hace unos segundos';
};