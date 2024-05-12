type User = {
  _id: string;
  firstName: string;
  lastName: string;
  picture: string;
  dateOfBirth: string | null;
  email: string;
  phone: string | null;
  isManager: boolean;
};

export default User;
