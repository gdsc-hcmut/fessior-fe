import AuthFormFieldEnum from './auth-form-field-enum';

type AuthFormFieldType = {
  label: string;
  type?: AuthFormFieldEnum;
  fixedValue?: boolean;
  currentValue: string;
  onChange?: (input: string) => void;
};

export default AuthFormFieldType;
