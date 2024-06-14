import { Organization } from '@/types';
import Url from '@/types/url-type';

type Category = {
  _id: string;
  name: string;
  color: string;
  organization: Organization['_id'];
  urls: Url['_id'][];
};

export default Category;
