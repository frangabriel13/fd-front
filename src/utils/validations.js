export const registerUserValidator = (email, password, confirmPassword) => {
  let errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'El email es requerido';
  } else if (!emailRegex.test(email)) {
    errors.email = 'El email es inválido';
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]{8,}$/;
  if (!password) {
    errors.password = 'La contraseña es requerida';
  } else if (!passwordRegex.test(password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Debes confirmar la contraseña';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};

export const loginValidator = (data) => {
  let errors = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'El email es requerido';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'El email es inválido';
  }

  if (!data.password) {
    errors.password = 'La contraseña es requerida';
  }

  return errors;
};

export const resetPasswordValidator = (password, confirmPassword) => {
  let errors = {};

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~\-]{8,}$/;
  if (!password) {
    errors.password = 'La contraseña es requerida';
  } else if (!passwordRegex.test(password)) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Debes confirmar la contraseña';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};

export const registerManufacturerValidator = ({ name, owner, phone, minPurchase, pointOfSale, street }) => {
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre de la tienda debe tener entre 3 y 100 caracteres';
  }

  if(!owner || typeof owner !== 'string' || owner.length < 3 || owner.length > 100) {  
    errors.owner = 'El nombre del dueño debe tener entre 3 y 100 caracteres';
  }

  if(!phone || typeof phone !== 'string' || phone.length < 10 || phone.length > 15) {  
    errors.phone = 'El teléfono debe tener entre 10 y 15 caracteres';
  }

  if(!minPurchase || typeof minPurchase !== 'number' || minPurchase < 1) {  
    errors.minPurchase = 'La compra mínima debe ser un número mayor a 0';
  }

  if (typeof pointOfSale !== 'boolean') {
    errors.pointOfSale = 'El campo punto de venta debe ser un booleano';
  }

  if (pointOfSale && (!street || typeof street !== 'string' || street.length < 3 || street.length > 100)) {
    errors.street = 'La dirección debe tener entre 3 y 100 caracteres';
  }

  return errors;
};

export const registerWholesalerValidator = ({ name, phone }) => {
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre de la tienda debe tener entre 3 y 100 caracteres';
  }

  if(!phone || typeof phone !== 'string' || phone.length < 10 || phone.length > 15) {  
    errors.phone = 'El teléfono debe tener entre 10 y 15 caracteres';
  }

  return errors;
};

export const editManufacturerValidator = ({ name, owner, phone, minPurchase, pointOfSale, street, tiktokUrl }) => {
  console.log('minPurchase', minPurchase);
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre de la tienda debe tener entre 3 y 100 caracteres';
  }

  if(!owner || typeof owner !== 'string' || owner.length < 3 || owner.length > 100) {  
    errors.owner = 'El nombre del dueño debe tener entre 3 y 100 caracteres';
  }

  if(!phone || typeof phone !== 'string' || phone.length < 10 || phone.length > 15) {  
    errors.phone = 'El teléfono debe tener entre 10 y 15 caracteres';
  }

  if(!minPurchase || typeof minPurchase !== 'number' || minPurchase < 1) {  
    errors.minPurchase = 'La compra mínima debe ser un número mayor a 0';
  }

  if (typeof pointOfSale !== 'boolean') {
    errors.pointOfSale = 'El campo punto de venta debe ser un booleano';
  }

  if (pointOfSale && (!street || typeof street !== 'string' || street.length < 3 || street.length > 100)) {
    errors.street = 'La dirección debe tener entre 3 y 100 caracteres';
  }

  if(tiktokUrl && typeof tiktokUrl !== 'string') {
    errors.tiktokUrl = 'La URL de TikTok debe ser un string';
  }

  return errors;
};

export const editWholesalerValidator = ({ name, phone, street, city, province, postalCode, country }) => {
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre de la tienda debe tener entre 3 y 100 caracteres';
  }

  if(!phone || typeof phone !== 'string' || phone.length < 10 || phone.length > 15) {  
    errors.phone = 'El teléfono debe tener entre 10 y 15 caracteres';
  }

  if(!street || typeof street !== 'string' || street.length < 3 || street.length > 100) {  
    errors.street = 'La dirección debe tener entre 3 y 100 caracteres';
  }

  if(!city || typeof city !== 'string' || city.length < 3 || city.length > 100) {  
    errors.city = 'La ciudad debe tener entre 3 y 100 caracteres';
  }

  if(!province || typeof province !== 'string' || province.length < 3 || province.length > 100) {  
    errors.province = 'La provincia debe tener entre 3 y 100 caracteres';
  }

  if(!postalCode || typeof postalCode !== 'string' || postalCode.length < 3 || postalCode.length > 100) {  
    errors.postalCode = 'El código postal debe tener entre 3 y 100 caracteres';
  }

  if(!country || typeof country !== 'string' || country.length < 3 || country.length > 100) {  
    errors.country = 'El país debe tener entre 3 y 100 caracteres';
  }

  return errors;
};

export const createVariableProductValidator = ({ name, price, description, tags, images, mainImage, colors }) => {
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre del producto debe tener entre 3 y 100 caracteres';
  }

  if(!description || typeof description !== 'string' || description.length < 3 || description.length > 1000) {
    errors.description = 'La descripción del producto debe tener entre 3 y 1000 caracteres';
  }

  if(!price || typeof price !== 'number' || price < 1) {
    errors.price = 'El precio debe ser un número mayor a 0';
  }

  if(!Array.isArray(images) || images.length < 1 || !mainImage || typeof mainImage !== 'string' || mainImage.trim() === '') {
    errors.images = 'Debes seleccionar al menos una imagen';
  }

  if(!Array.isArray(colors) || colors.length < 1) {
    errors.colors = 'Debes seleccionar al menos un color';
  }

  if(tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
    errors.tags = 'Las etiquetas deben ser un array de strings';
  }

  return errors;
}

export const createSimpleProductValidator = ({ name, price, description, tags, images, mainImage, sizes }) => {
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre del producto debe tener entre 3 y 100 caracteres';
  }

  if(!description || typeof description !== 'string' || description.length < 3 || description.length > 1000) {
    errors.description = 'La descripción del producto debe tener entre 3 y 1000 caracteres';
  }

  if(!price || typeof price !== 'number' || price < 1) {
    errors.price = 'El precio debe ser un número mayor a 0';
  }

  if(!Array.isArray(images) || images.length < 1 || !mainImage || typeof mainImage !== 'string' || mainImage.trim() === '') {
    errors.images = 'Debes seleccionar al menos una imagen';
  }

  if(!Array.isArray(sizes) || sizes.length < 1) {
    errors.sizes = 'Debes seleccionar al menos un tamaño';
  }

  if(tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
    errors.tags = 'Las etiquetas deben ser un array de strings';
  }

  return errors;
}

export const createBisuteriProductValidator = ({ name, price, description, tags, images, mainImage }) => {
  const errors = {};

  if(!name || typeof name !== 'string' || name.length < 3 || name.length > 100) {  
    errors.name = 'El nombre del producto debe tener entre 3 y 100 caracteres';
  }

  if(!description || typeof description !== 'string' || description.length < 3 || description.length > 1000) {
    errors.description = 'La descripción del producto debe tener entre 3 y 1000 caracteres';
  }

  if(!price || typeof price !== 'number' || price < 1) {
    errors.price = 'El precio debe ser un número mayor a 0';
  }

  if(!Array.isArray(images) || images.length < 1 || !mainImage || typeof mainImage !== 'string' || mainImage.trim() === '') {
    errors.images = 'Debes seleccionar al menos una imagen';
  }

  if(tags && (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))) {
    errors.tags = 'Las etiquetas deben ser un array de strings';
  }

  return errors;
}