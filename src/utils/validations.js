export const registerUserValidator = (email, password, confirmPassword) => {
  let errors = {};
  if(!email) {
    errors.email = 'El email es requerido';
  } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El email es inválido';
  }

  if(!password) {
    errors.password = 'La contraseña es requerida';
  } else if(password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if(!confirmPassword) {
    errors.confirmPassword = 'Debes confirmar la contraseña';
  } else if(password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};