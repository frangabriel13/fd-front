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

  if(!name || typeof name !== 'string' || name.lejgth < 3 || name.length > 100) {  
    errors.name = 'El nombre de la tienda debe tener entre 3 y 100 caracteres';
  }

  if(!owner || typeof owner !== 'string' || owner.lejgth < 3 || owner.length > 100) {  
    errors.owner = 'El nombre del dueño debe tener entre 3 y 100 caracteres';
  }

  if(!phone || typeof phone !== 'string' || phone.lejgth < 10 || phone.length > 15) {  
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