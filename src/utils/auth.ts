export const REQUIREMENT_NUMBER = 3;
export const VERIFICATION_CODE_LENGTH = 4;

export const passwordRequirements = [
  'Be between 8 and 16 characters',
  'Contain at least one lowercase and one uppercase character',
  'Contain at least one number and one special character',
];

export function validatePassword(password: string) {
  const validations = Array(REQUIREMENT_NUMBER).fill(true);

  if (password.length < 8 || password.length > 16) {
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
