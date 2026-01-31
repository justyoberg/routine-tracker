import { User } from '../models/User';
import { type UserBase } from '../validators/user.validator';

const createUser = async (data: UserBase) => {
  const user = new User({ ...data });
  const savedUser = await user.save();
  return savedUser;
};

export default { createUser };
