import User from '@/types/user-type';

import SAMPLE_USERS from '../data/users';

async function getAllUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(SAMPLE_USERS), 500));
}

const userService = { getAllUsers };

export default userService;
