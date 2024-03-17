import Category from '@/types/category-type';
import Organization from '@/types/organization-type';
import ShortenInputFieldType from '@/types/shorten-input-field-type';

export const isOrganization = (
  option: ShortenInputFieldType,
): option is Organization => {
  return (option as Organization).shortName !== undefined;
};

export const isCategory = (
  option: ShortenInputFieldType,
): option is Category => {
  return (option as Category).name !== undefined;
};

export const getOptionText = (option: ShortenInputFieldType) => {
  if (isOrganization(option)) {
    return option.shortName;
  }
  if (isCategory(option)) {
    return option.name;
  }
  return option;
};
