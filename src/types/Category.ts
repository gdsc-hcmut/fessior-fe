import { Organization } from './Organization';
import Url from './url-type';

export type Category = {
  _id: string;
  name: string;
  color: string;
  organization: Organization['_id'];
  urls: Url['_id'][];
};

export enum CategoryColor {
  RED = '#e30425',
  BLUE = '#84d2f4',
  ORANGE = '#f9aa33',
  GREEN = '#48b24f',
  PURPLE = '#aaabcd',
}
