import SAMPLE_USERS from '../data/users';
import User from '../types/user';

async function getAllUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(SAMPLE_USERS), 500));
}

const userService = { getAllUsers };

export default userService;
