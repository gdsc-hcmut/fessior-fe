export function validatePassword(
  requirementQuantity: number,
  password: string,
) {
  const validations = Array(requirementQuantity).fill(true);

  if (password.length < 6 || password.length >= 16) {
    validations[0] = false;
  }
  if (!(password.match(/[A-Z]/g) && password.match(/[a-z]/g))) {
    validations[1] = false;
  }
  if (
    !(password.match(/[0-9]/g) && password.match(/[!@#$%^&*(),.?"":{}|<>]/g))
  ) {
    validations[2] = false;
  }

  return validations;
}

export function isValidUsername(username: string) {
  return username.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}
