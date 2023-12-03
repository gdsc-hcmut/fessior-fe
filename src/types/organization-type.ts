interface IOrganization {
  _id: string;
  longName: string;
  shortName: string;
  managers: string[];
  domains: string[];
}

export default IOrganization;
