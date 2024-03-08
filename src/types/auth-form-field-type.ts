type AuthFormField = {
  label: string;
  isPassword?: boolean;
  fixedValue?: boolean;
  currentValue: string;
  onChange?: (input: string) => void;
};

export default AuthFormField;
