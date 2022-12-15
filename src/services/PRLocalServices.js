export function validateEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
    ? ""
    : "Correo electronico invalido";
}

export function validateName(name) {
  return /^$|^[A-ZÁÉÍÓÚÑa-záéíóúñ -]+$/.test(name) ? "" : "Nombre invalido";
}
