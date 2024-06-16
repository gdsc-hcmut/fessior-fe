import { Category } from './Category';
import { Organization } from './Organization';

export type ShortenInputFieldType = string | Organization | Category;

export enum ShortenInputFieldEnum {
  ORGANIZATION,
  DOMAIN,
  CATEGORY,
}
