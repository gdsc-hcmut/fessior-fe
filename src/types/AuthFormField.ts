export enum AuthFormFieldEnum {
  USERNAME,
  PASSWORD,
  VERIFICATION_CODE,
}

export type AuthFormFieldType = {
  label: string;
  type?: AuthFormFieldEnum;
  fixedValue?: boolean;
  currentValue: string;
  onChange?: (input: string) => void;
};
