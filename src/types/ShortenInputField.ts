import Category from '@/types/category-type';
import Organization from '@/types/organization-type';

export type ShortenInputFieldType = string | Organization | Category;

export enum ShortenInputFieldEnum {
  ORGANIZATION,
  DOMAIN,
  CATEGORY,
}
