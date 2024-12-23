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